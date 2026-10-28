import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import researchFixture from "@/test/fixtures/research.json";
import { json, mockFetch } from "@/test/mockFetch";
import ResearchDisplay from "./ResearchDisplay";

const RESEARCH_URL =
  "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/research.json";

describe("ResearchDisplay", () => {
  it("shows each task with its reward Pokémon", async () => {
    mockFetch({ [RESEARCH_URL]: json(researchFixture) });
    render(await ResearchDisplay());

    expect(screen.getAllByText(/Catch 13 Ghost-type Pokémon/)).toHaveLength(1);
    const firstReward = researchFixture[0].rewards[0].name;
    expect(screen.getAllByRole("img", { name: firstReward }).length).toBeGreaterThan(0);
  });

  it("shows reward details when a reward is opened", async () => {
    const user = userEvent.setup();
    mockFetch({ [RESEARCH_URL]: json(researchFixture) });
    render(await ResearchDisplay());

    const reward = researchFixture[0].rewards[0];
    await user.click(screen.getAllByRole("button", { name: reward.name })[0]);

    expect(await screen.findByText(`100% CP: ${reward.combatPower.max}`)).toBeInTheDocument();
  });

  it("doesn't show ScrapedDuck's <span> markup", async () => {
    mockFetch({ [RESEARCH_URL]: json(researchFixture) });
    const { container } = render(await ResearchDisplay());
    expect(container.textContent).not.toContain("<span>");
  });

  it("handles repeated task texts without duplicate keys", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    mockFetch({ [RESEARCH_URL]: json(researchFixture) });

    render(await ResearchDisplay());

    expect(error.mock.calls.flat().join(" ")).not.toMatch(/same key/);
  });

  it("renders nothing when the feed fails", async () => {
    mockFetch({ [RESEARCH_URL]: new Response("nope", { status: 500 }) });
    expect(await ResearchDisplay()).toBeNull();
  });
});
