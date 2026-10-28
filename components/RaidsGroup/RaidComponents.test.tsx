import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { RaidPokemon } from "@/interfaces/interfaces";
import maxBattlesFixture from "@/test/fixtures/maxbattles.json";
import raidFixture from "@/test/fixtures/raidboss.json";
import { json, mockFetch } from "@/test/mockFetch";
import BattlesDisplay from "./BattlesDisplay";
import BossCard from "./BossCard";
import RaidsDisplay from "./RaidsDisplay";

const RAIDS_URL = "https://pokemon-go-api.github.io/pokemon-go-api/api/raidboss.json";
const MAX_URL = "https://pokemon-go-api.github.io/pokemon-go-api/api/maxbattles.json";

const boss = (overrides: Partial<RaidPokemon> = {}): RaidPokemon => ({
  ...(raidFixture.currentList.lvl5[0] as unknown as RaidPokemon),
  shadow: false,
  ...overrides,
});

// Popout dialog titles also render as <h2> (see 2.3), so keep tier headings only.
const tierHeadings = () =>
  screen
    .getAllByRole("heading", { level: 2 })
    .map((h) => h.textContent)
    .filter((text) => /^Tier \d$/.test(text ?? ""));

describe("BossCard", () => {
  it("shows the boss name, image and types", () => {
    render(<BossCard raidBoss={boss()} />);
    expect(screen.getByText("Giratina (Origin Forme)")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Giratina (Origin Forme)" })).toBeInTheDocument();
    expect(screen.getByText("Ghost")).toBeInTheDocument();
    expect(screen.getByText("Dragon")).toBeInTheDocument();
  });

  it("links to the boss's Pokédex page by API id", () => {
    render(<BossCard raidBoss={boss()} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokemon/giratina");
  });

  it("marks shadow and possibly-shiny bosses", () => {
    render(<BossCard raidBoss={boss({ shadow: true, shiny: true })} />);
    expect(screen.getByRole("img", { name: "Shadow Raid" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Possible Shiny" })).toBeInTheDocument();
  });

  it("leaves the markers off ordinary bosses", () => {
    render(<BossCard raidBoss={boss({ shadow: false, shiny: false })} />);
    expect(screen.queryByRole("img", { name: "Shadow Raid" })).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "Possible Shiny" })).not.toBeInTheDocument();
  });

  it("shows the boost weather", () => {
    render(<BossCard raidBoss={boss()} weather={["windy", "fog"]} />);
    const src = screen.getByRole("img", { name: "windy" }).getAttribute("src")!;
    expect(decodeURIComponent(src)).toContain("/weather/windy.webp");
    expect(screen.getByRole("img", { name: "fog" })).toBeInTheDocument();
  });

  it("renders no broken image for unknown weather", () => {
    const { container } = render(<BossCard raidBoss={boss()} weather={["windy", "volcanic"]} />);
    expect(container.querySelectorAll("img:not([src]), img[src='']")).toHaveLength(0);
  });

  it("renders extra content passed as children", () => {
    render(
      <BossCard raidBoss={boss()}>
        <p>CP info</p>
      </BossCard>,
    );
    expect(screen.getByText("CP info")).toBeInTheDocument();
  });
});

describe("RaidsDisplay", () => {
  it("shows tiers from hardest to easiest", async () => {
    mockFetch({ [RAIDS_URL]: json(raidFixture) });
    render(await RaidsDisplay());
    expect(tierHeadings()).toEqual(["Tier 5", "Tier 4", "Tier 3", "Tier 1"]);
  });

  it("lists the bosses in each tier", async () => {
    mockFetch({ [RAIDS_URL]: json(raidFixture) });
    render(await RaidsDisplay());

    const tier4 = screen.getByRole("heading", { name: "Tier 4" }).closest("[data-slot=collapsible]")!;
    expect(within(tier4 as HTMLElement).getByText("Mega Sableye")).toBeInTheDocument();
  });

  it("hides empty tiers", async () => {
    const withoutTier3 = Object.fromEntries(
      Object.entries(raidFixture.currentList).filter(([list]) => !list.endsWith("lvl3")),
    );
    mockFetch({ [RAIDS_URL]: json({ currentList: withoutTier3 }) });
    render(await RaidsDisplay());
    expect(tierHeadings()).not.toContain("Tier 3");
  });

  it("renders nothing when the API fails", async () => {
    mockFetch({ [RAIDS_URL]: new Response("nope", { status: 500 }) });
    expect(await RaidsDisplay()).toBeNull();
  });

  it("gives every boss a unique React key [bug 3.10]", async () => {
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const giratina = raidFixture.currentList.lvl5[0];
    mockFetch({
      [RAIDS_URL]: json({
        currentList: {
          lvl5: [giratina, { ...giratina, form: "GIRATINA_ALTERED" }],
          shadow_lvl5: [giratina],
        },
      }),
    });

    render(await RaidsDisplay());

    expect(error.mock.calls.flat().join(" ")).not.toMatch(/same key/);
  });
});

describe("BattlesDisplay", () => {
  it("shows non-empty tiers from 6 down to 1", async () => {
    mockFetch({ [MAX_URL]: json(maxBattlesFixture) });
    render(await BattlesDisplay());
    expect(tierHeadings()).toEqual(["Tier 6", "Tier 5", "Tier 3", "Tier 2", "Tier 1"]);
  });

  it("renders nothing when the API fails", async () => {
    mockFetch({ [MAX_URL]: new TypeError("fetch failed") });
    expect(await BattlesDisplay()).toBeNull();
  });
});
