import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NOW } from "@/test/fixtures/events";
import { LiveShiniesDisplay } from "./LiveShiniesDisplay";

const MINUTE = 60_000;
const at = (offsetMs: number) => new Date(NOW.getTime() + offsetMs).toISOString();

const shiny = (name: string, dexNr: number, start: number, end: number) => ({
  dexNr,
  name,
  image: `https://example.test/${dexNr}.png`,
  startDate: at(start),
  endDate: at(end),
});

describe("LiveShiniesDisplay", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(NOW);
  });

  it("shows only Pokémon whose boost window is open", () => {
    render(
      <LiveShiniesDisplay
        boostedShinies={[
          shiny("Pawniard", 624, -60 * MINUTE, 60 * MINUTE),
          shiny("Blitzle", 522, 60 * MINUTE, 120 * MINUTE),
          shiny("Tinkatink", 957, -120 * MINUTE, -60 * MINUTE),
        ]}
      />,
    );

    expect(screen.getByRole("img", { name: "Pawniard" })).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Blitzle" })).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Tinkatink" })).not.toBeInTheDocument();
  });

  it("links each shiny to its Pokédex page", () => {
    render(<LiveShiniesDisplay boostedShinies={[shiny("Pawniard", 624, -MINUTE, MINUTE)]} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokemon/pawniard");
  });

  it("shows an empty state when nothing is boosted", () => {
    render(<LiveShiniesDisplay boostedShinies={[shiny("Blitzle", 522, MINUTE, 2 * MINUTE)]} />);
    expect(screen.getByText("No Boosted Shinies")).toBeInTheDocument();
  });

  it("re-checks the windows every five minutes", () => {
    render(
      <LiveShiniesDisplay boostedShinies={[shiny("Pawniard", 624, 2 * MINUTE, 60 * MINUTE)]} />,
    );
    expect(screen.queryByRole("img", { name: "Pawniard" })).not.toBeInTheDocument();

    act(() => vi.advanceTimersByTime(5 * MINUTE));

    expect(screen.getByRole("img", { name: "Pawniard" })).toBeInTheDocument();
  });
});
