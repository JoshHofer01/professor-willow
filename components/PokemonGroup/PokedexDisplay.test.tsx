import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { router, setSearchParams } from "@/test/mocks/navigation";
import { PokedexDisplay } from "./PokedexDisplay";

/** Names of the Pokémon shown in the results grid. */
function shownNames() {
  return screen
    .queryAllByRole("link")
    .map((link) => within(link).getByRole("img").getAttribute("alt"));
}

const typeFilter = () => screen.getByRole("combobox", { name: /^Filter by type/ });

describe("PokedexDisplay", () => {
  it("shows only the selected generation", () => {
    setSearchParams({ gen: "1" });
    render(<PokedexDisplay />);

    const names = shownNames();
    expect(names).toContain("Bulbasaur");
    expect(names).toContain("Mew");
    expect(names).not.toContain("Chikorita");
    expect(names).toHaveLength(151);
  });

  it("filters by type, matching primary or secondary type", () => {
    setSearchParams({ gen: "1", type: "Poison" });
    render(<PokedexDisplay />);

    const names = shownNames();
    expect(names).toContain("Ekans"); // primary Poison
    expect(names).toContain("Bulbasaur"); // secondary Poison
    expect(names).not.toContain("Charmander");
  });

  it("shows every generation for gen=all", () => {
    setSearchParams({ gen: "all", type: "Dragon" });
    render(<PokedexDisplay />);

    const names = shownNames();
    expect(names).toContain("Dratini");
    expect(names).toContain("Garchomp");
  });

  it("starts from the query in the URL, case-insensitively", () => {
    setSearchParams({ gen: "1", query: "CHAR" });
    render(<PokedexDisplay />);
    expect(shownNames()).toEqual(["Charmander", "Charmeleon", "Charizard"]);
  });

  it("filters by search after the 750 ms debounce and records it in the URL", async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    setSearchParams({ gen: "1" });
    render(<PokedexDisplay />);

    await user.type(screen.getByRole("searchbox"), "pika");
    expect(shownNames()).toHaveLength(151);

    await act(() => vi.advanceTimersByTimeAsync(750));

    expect(shownNames()).toEqual(["Pikachu"]);
    expect(router.push).toHaveBeenLastCalledWith("?gen=1&query=pika");
  });

  it("pushes the chosen type filter to the URL", async () => {
    const user = userEvent.setup();
    setSearchParams({ gen: "1" });
    render(<PokedexDisplay />);

    await user.click(typeFilter());
    await user.click(await screen.findByRole("option", { name: "Fire" }));

    expect(router.push).toHaveBeenCalledWith("?gen=1&type=Fire");
  });

  it("removes a filter from the URL when it is deselected", async () => {
    const user = userEvent.setup();
    setSearchParams({ gen: "1", type: "Fire" });
    render(<PokedexDisplay />);

    await user.click(typeFilter());
    await user.click(await screen.findByRole("option", { name: "Fire" }));

    expect(router.push).toHaveBeenCalledWith("?gen=1");
  });

  it("links each Pokémon to its detail page", () => {
    setSearchParams({ gen: "1", query: "bulba" });
    render(<PokedexDisplay />);
    expect(screen.getByRole("link", { name: /bulbasaur/i })).toHaveAttribute(
      "href",
      "/pokemon/bulbasaur",
    );
  });

  it.each([
    ["1", "mr. mime", "/pokemon/mr_mime"],
    ["2", "ho-oh", "/pokemon/ho_oh"],
    ["1", "nidoran♀", "/pokemon/nidoran_female"],
    ["1", "farfetch", "/pokemon/farfetchd"],
    ["6", "flab", "/pokemon/flabebe"],
  ])("links gen %s %j to the API id %s", (gen, query, href) => {
    setSearchParams({ gen, query });
    render(<PokedexDisplay />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", href);
  });

  it("shows Pokémon whose API image is missing, e.g. Unown [bug 3.16]", () => {
    setSearchParams({ gen: "2", query: "unown" });
    render(<PokedexDisplay />);
    expect(shownNames()).toEqual(["Unown"]);
  });
});
