import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { AssetForm, Move, PokemonType } from "@/interfaces/interfaces";
import { makePokemon, neighbour } from "@/test/fixtures/pokemon";
import {
  FormDisplay,
  MovesDisplay,
  NextMonDisplay,
  PokemonTypeBadge,
  PrevMonDisplay,
  StatsDisplay,
  TypeBadgesDisplay,
} from "./PokemonIdDisplays";

const type = (english: string): PokemonType => ({
  type: `POKEMON_TYPE_${english.toUpperCase()}`,
  names: { English: english },
});

const move = (id: string, english: string, typeName: string) =>
  ({ id, names: { English: english }, type: type(typeName) }) as Move;

/** Colour class of each stat bar, in order HP, Attack, Defense. */
function barColours() {
  return [...document.querySelectorAll("[data-slot=progress-indicator]")].map((el) =>
    [...el.classList].find((c) => /^bg-(red|amber|green)-500$/.test(c)),
  );
}

describe("StatsDisplay", () => {
  it("labels the three stats", () => {
    render(<StatsDisplay pokemon={makePokemon()} />);
    for (const label of ["HP", "Attack", "Defense"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("colours bars red below 33%, amber in between and green above 66%", () => {
    // Maximums: HP 420, Attack 360, Defense 350.
    render(<StatsDisplay pokemon={makePokemon({ stats: { stamina: 84, attack: 300, defense: 175 } })} />);
    expect(barColours()).toEqual(["bg-red-500", "bg-green-500", "bg-amber-500"]);
  });

  it("fills each bar in proportion to the stat", () => {
    render(<StatsDisplay pokemon={makePokemon({ stats: { stamina: 210, attack: 360, defense: 35 } })} />);
    const widths = [...document.querySelectorAll<HTMLElement>("[data-slot=progress-indicator]")].map(
      (el) => el.style.transform,
    );
    expect(widths).toEqual(["translateX(-50%)", "translateX(-0%)", "translateX(-90%)"]);
  });

  it("exposes each stat's value to assistive technology [bug 2.10]", () => {
    render(<StatsDisplay pokemon={makePokemon({ stats: { stamina: 210, attack: 180, defense: 175 } })} />);
    expect(screen.getAllByRole("progressbar").map((bar) => bar.getAttribute("aria-valuenow"))).toEqual([
      "50",
      "50",
      "50",
    ]);
  });
});

describe("PokemonTypeBadge / TypeBadgesDisplay", () => {
  it("colours a type badge by type", () => {
    render(<PokemonTypeBadge type="Fire" />);
    expect(screen.getByText("Fire")).toHaveClass("bg-red-500");
  });

  it("uses grey for unknown types", () => {
    render(<PokemonTypeBadge type="Shadow" />);
    expect(screen.getByText("Shadow")).toHaveClass("bg-gray-400");
  });

  it("shows one badge for a single-type Pokémon", () => {
    render(<TypeBadgesDisplay primary={type("Fire")} />);
    expect(document.querySelectorAll("[data-slot=badge]")).toHaveLength(1);
  });

  it("shows both badges for a dual-type Pokémon", () => {
    render(<TypeBadgesDisplay primary={type("Grass")} secondary={type("Poison")} />);
    expect(screen.getByText("Grass")).toBeInTheDocument();
    expect(screen.getByText("Poison")).toBeInTheDocument();
  });
});

describe("MovesDisplay", () => {
  it("lists normal moves with their types", () => {
    render(
      <MovesDisplay
        type="Quick Moves"
        moves={{ VINE_WHIP: move("VINE_WHIP", "Vine Whip", "Grass") }}
        eliteMoves={{}}
      />,
    );
    expect(screen.getByRole("heading", { name: "Quick Moves" })).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveTextContent("Vine WhipGrass");
  });

  it("marks elite moves", () => {
    render(
      <MovesDisplay
        type="Charged Moves"
        moves={{ SLUDGE_BOMB: move("SLUDGE_BOMB", "Sludge Bomb", "Poison") }}
        eliteMoves={{ FRENZY_PLANT: move("FRENZY_PLANT", "Frenzy Plant", "Grass") }}
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).not.toHaveTextContent("Elite");
    expect(items[1]).toHaveTextContent("Frenzy PlantElite");
  });

  it("falls back to the move id when it has no English name", () => {
    render(
      <MovesDisplay
        type="Quick Moves"
        moves={{ X: { ...move("MYSTERY_MOVE", "", "Normal"), names: undefined as never } }}
        eliteMoves={{}}
      />,
    );
    expect(screen.getByRole("listitem")).toHaveTextContent("MYSTERY_MOVE");
  });
});

describe("FormDisplay", () => {
  const forms = [{ form: "MEGA", image: "m.png", shinyImage: "ms.png" }] as AssetForm[];

  it("shows the form icon when the Pokémon has that form", () => {
    render(<FormDisplay name="Venusaur" assets={forms} formType="MEGA" />);
    expect(screen.getByRole("img", { name: "MEGA Venusaur" })).toBeInTheDocument();
  });

  it("renders nothing when the form is missing", () => {
    const { container } = render(
      <FormDisplay name="Venusaur" assets={forms} formType="GIGANTAMAX" />,
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe("Next / previous Pokémon", () => {
  it("links to the next Pokémon and says when it is an evolution", () => {
    render(<NextMonDisplay pokemon={makePokemon()} />);

    expect(screen.getByText(/evolves into/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ivysaur" })).toHaveAttribute("href", "/pokemon/ivysaur");
  });

  it("links to the previous Pokémon with an absolute URL", () => {
    render(<PrevMonDisplay pokemon={neighbour(2, "IVYSAUR", "Ivysaur")} />);
    expect(screen.getByRole("link", { name: "Bulbasaur" })).toHaveAttribute("href", "/pokemon/bulbasaur");
  });

  it("shows nothing before #1", () => {
    const { container } = render(<PrevMonDisplay pokemon={makePokemon()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("doesn't call the next Pokémon an evolution when it isn't one", () => {
    const golbat = makePokemon({
      dexNr: 42,
      id: "GOLBAT",
      names: { English: "Golbat" },
      evolutions: [{ id: "CROBAT" }],
    });

    render(<NextMonDisplay pokemon={golbat} />);

    expect(screen.queryByText(/evolves into/i)).not.toBeInTheDocument();
    expect(screen.getByText(/next pok[eé]mon/i)).toBeInTheDocument();
  });

  it("skips gaps in the dex: #901 → #903", () => {
    render(<NextMonDisplay pokemon={neighbour(901, "URSALUNA", "Ursaluna")} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokemon/sneasler");
  });

  it("skips gaps in the dex: #903 → #901", () => {
    render(<PrevMonDisplay pokemon={neighbour(903, "SNEASLER", "Sneasler")} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/pokemon/ursaluna");
  });

  it("shows nothing after the last Pokémon", () => {
    const { container } = render(
      <NextMonDisplay pokemon={neighbour(1025, "PECHARUNT", "Pecharunt")} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("doesn't nest the tooltip button inside the link", () => {
    const { container } = render(<NextMonDisplay pokemon={makePokemon()} />);
    expect(container.querySelector("a button, button a")).toBeNull();
  });
});
