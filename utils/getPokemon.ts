import { PokemonData } from "@/interfaces/interfaces";
import { fetchJson } from "./fetchJson";
import { getPkmnImgUrl } from "./getPkmnImgUrl";

const POKEDEX_API = "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex";

export async function getPokemonByDexNr(dexNr: string) {
  const pokemonData = await fetchJson<PokemonData>(`${POKEDEX_API}/id/${dexNr}.json`, {
    source: "getPokemonByDexNr",
  });
  if (!pokemonData) return null;

  return { pokemon: fixAssets(pokemonData) };
}

export async function getPokemonByName(pokemonName: string) {
  const pokemonData = await fetchJson<PokemonData>(
    `${POKEDEX_API}/name/${pokemonName.toUpperCase()}.json`,
    { source: "getPokemonByName" },
  );
  if (!pokemonData) return null;

  return { pokemon: fixAssets(pokemonData) };
}

function fixAssets(pokemonData: PokemonData): PokemonData {
  const fallbackAsset = "/QuestionMark.png";
  if (pokemonData.assets !== null) {
    return {
      ...pokemonData,
      assets: {
        image: getPkmnImgUrl(pokemonData.dexNr),
        shinyImage: getPkmnImgUrl(pokemonData.dexNr, true),
      }
    };
  }

  return {
    ...pokemonData,
    assets: {
      image: fallbackAsset,
      shinyImage: fallbackAsset,
    }
  };
}
