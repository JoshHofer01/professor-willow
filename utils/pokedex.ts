import pokemonIndex from "@/data/pokemonIndex.json";
import { PokemonDataMin } from "@/interfaces/interfaces";

/** The local Pokédex index, sorted by dex number. */
export const pokedex: PokemonDataMin[] = pokemonIndex;

const byId = new Map(pokedex.map((pokemon) => [pokemon.id, pokemon]));
const byDexNr = new Map(pokedex.map((pokemon) => [pokemon.dexNr, pokemon]));

/** Pokédex page for an API id, e.g. `MR_MIME` → `/pokemon/mr_mime`. */
export function pokemonHref(id: string) {
  return `/pokemon/${id.toLowerCase()}`;
}

/** Slugs the detail page accepts: lowercase API ids. */
export function isPokemonSlug(slug: string) {
  return /^[a-z0-9_]+$/i.test(slug);
}

export function findPokemonById(id: string) {
  return byId.get(id.toUpperCase());
}

export function findPokemonByDexNr(dexNr: number) {
  return byDexNr.get(dexNr);
}
