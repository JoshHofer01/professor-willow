// @vitest-environment node
import { describe, expect, it } from "vitest";
import {
  findPokemonByDexNr,
  findPokemonById,
  isPokemonSlug,
  pokedex,
  pokemonHref,
} from "./pokedex";

describe("pokemonHref", () => {
  it("lowercases the API id", () => {
    expect(pokemonHref("MR_MIME")).toBe("/pokemon/mr_mime");
  });

  it("gives every Pokédex entry a URL its own slug check accepts", () => {
    for (const pokemon of pokedex) {
      const slug = pokemonHref(pokemon.id).replace("/pokemon/", "");
      expect(isPokemonSlug(slug), pokemon.name).toBe(true);
    }
  });
});

describe("isPokemonSlug", () => {
  it.each(["bulbasaur", "mr_mime", "porygon2", "MR_MIME"])("accepts %j", (slug) => {
    expect(isPokemonSlug(slug)).toBe(true);
  });

  it.each(["", "mr. mime", "ho-oh", "farfetch'd", "../etc", "nidoran♀", "a/b"])(
    "rejects %j",
    (slug) => {
      expect(isPokemonSlug(slug)).toBe(false);
    },
  );
});

describe("lookups", () => {
  it("finds a Pokémon by API id, case-insensitively", () => {
    expect(findPokemonById("mr_mime")?.name).toBe("Mr. Mime");
    expect(findPokemonById("HO_OH")?.dexNr).toBe(250);
  });

  it("finds a Pokémon by dex number", () => {
    expect(findPokemonByDexNr(25)?.id).toBe("PIKACHU");
  });

  it("returns undefined for unknown Pokémon", () => {
    expect(findPokemonById("MISSINGNO")).toBeUndefined();
    expect(findPokemonByDexNr(902)).toBeUndefined();
  });
});
