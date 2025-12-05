import { PokemonData } from "@/interfaces/interfaces";

export async function getPokemonByGeneration(genNumber: string) {
  try {
    const response = await fetch(
      `https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/generation/${genNumber}.json`
    );

    if (!response.ok) {
      console.error("Failed to fetch pokemon", response.status);
      return null;
    }

    const pokemonData: PokemonData[] = await response.json();
    pokemonData.map((mon) => {
        try {
            fixNullAssets(mon);
        } catch (error) {
            console.log(error);
        }
    })

    return { pokemonData };
  } catch (error) {
    console.error("Error fetching pokemon", error);
    return null;
  }
}

export async function getAllPokemon() {
  try {
    const response = await fetch(
      "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json"
    );

    if (!response.ok) {
      console.error("Failed to fetch pokemon", response.status);
      return null;
    }

    const data: PokemonData[] = await response.json();

    const pokemonData = data.map((mon) => {
        try {
            return fixNullAssets(mon);
        } catch (error) {
            console.log(error);
            return mon;
        }
    })

    return { pokemonData };
  } catch (error) {
    console.error("Error fetching pokemon", error);
    return null;
  }
}

export async function getPokemonByDexNr(dexNr: string) {
  try {
    const response = await fetch(
      `https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/id/${dexNr}.json`
    );

    if (!response.ok) {
      console.error("Failed to fetch pokemon", response.status);
      return null;
    }

    const pokemonData: PokemonData = await response.json();
    const pokemon = fixNullAssets(pokemonData);

    return { pokemon };
  } catch (error) {
    console.error("Error fetching pokemon", error);
    return null;
  }
}

export async function getPokemonByName(pokemonName: string) {
  try {
    const response = await fetch(
      `https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/name/${pokemonName}.json`
    );

    if (!response.ok) {
      console.error("Failed to fetch pokemon", response.status);
      return null;
    }

    const pokemonData: PokemonData = await response.json();
    const pokemon = fixNullAssets(pokemonData);

    return { pokemon };
  } catch (error) {
    console.error("Error fetching pokemon", error);
    return null;
  }
}

function fixNullAssets(pokemonData: PokemonData): PokemonData {
  const fallbackAsset = "/QuestionMark.png";
  if (pokemonData.assets !== null) { return pokemonData }

  try {
    return {
      ...pokemonData,
      assets: {
        image: fallbackAsset,
        shinyImage: fallbackAsset,
      },
    };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Invalid Pokémon:", pokemonData.id, err);
    }
    return pokemonData;
  }
}
