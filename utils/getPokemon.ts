import { PokemonData } from "@/interfaces/interfaces";
import * as Sentry from "@sentry/nextjs";
import { getPkmnImgUrl } from "./getPkmnImgUrl";

export async function getPokemonByGeneration(genNumber: string) {
  try {
    const response = await fetch(
      `https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/generation/${genNumber}.json`,
    );

    if (!response.ok) {
      Sentry.captureException(`Failed to fetch pokemon, ${response.status}`);
      return null;
    }

    const pokemonData: PokemonData[] = await response.json();
    pokemonData.map((mon) => {
      try {
        fixAssets(mon);
      } catch (error) {
        Sentry.captureException(error);
      }
    });

    return { pokemonData };
  } catch (error) {
    Sentry.captureException(`Error fetching pokemon, ${error}`);
    return null;
  }
}

export async function getAllPokemon() {
  try {
    const response = await fetch(
      "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json",
    );

    if (!response.ok) {
      Sentry.captureException(`Failed to fetch pokemon, ${response.status}`);
      return null;
    }

    const data: PokemonData[] = await response.json();

    const pokemonData = data.map((mon) => {
      try {
        return fixAssets(mon);
      } catch (error) {
        Sentry.captureException(error);
        return mon;
      }
    });

    return { pokemonData };
  } catch (error) {
    Sentry.captureException(`Error fething pokemon, ${error}`);
    return null;
  }
}

export async function getPokemonByDexNr(dexNr: string) {
  try {
    const response = await fetch(
      `https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/id/${dexNr}.json`,
    );

    if (!response.ok) {
      Sentry.captureException(`Failed to fetch pokemon, ${response.status}`);
      return null;
    }

    const pokemonData: PokemonData = await response.json();
    const pokemon = fixAssets(pokemonData);

    return { pokemon };
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
}

export async function getPokemonByName(pokemonName: string) {
  try {
    const response = await fetch(
      `https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/name/${pokemonName.toUpperCase()}.json`,
    );

    if (!response.ok) {
      Sentry.captureException(`Failed to fetch pokemon, ${response.status}`);
      return null;
    }

    const pokemonData: PokemonData = await response.json();
    const pokemon = fixAssets(pokemonData);

    return { pokemon };
  } catch (error) {
    Sentry.captureException(`Error fetching pokemon, ${error}`);
    return null;
  }
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

  try {
    return {
      ...pokemonData,
      assets: {
        image: fallbackAsset,
        shinyImage: fallbackAsset,
      }
    };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Invalid Pokémon:", pokemonData.id, err);
    } else {
      Sentry.captureException(err);
    }
    return pokemonData;
  }
}
