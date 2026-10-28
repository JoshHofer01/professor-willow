import type { PokemonData } from "@/interfaces/interfaces";
import bulbasaur from "./pokemon-bulbasaur.json";

/** A Bulbasaur-shaped API Pokémon with the given fields replaced. */
export function makePokemon(overrides: Partial<PokemonData> = {}): PokemonData {
  return { ...(bulbasaur as unknown as PokemonData), ...overrides };
}

/** Minimal API Pokémon for neighbour lookups. */
export function neighbour(dexNr: number, id: string, english: string) {
  return makePokemon({ dexNr, id, names: { English: english }, evolutions: [] });
}
