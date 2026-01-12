
// npm run pokemon:index
// Recommended to run minimally once per Pokemon GO update cycle

import { writeFile } from "fs";

const filepath = "data/pokemonIndex.json";
async function getPokemonIndex() {
  try {
    const response = await fetch(
      "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json"
    );

    if (!response.ok) {
      console.error("Failed to fetch pokemon:", response.status);
      process.exit();
    }

    const pokemonData = await response.json();

    // Filter data into PokemonDataMin type
    const pokemonDataMin = [];
    pokemonData.forEach((element) => {
      let pokemon = {
        dexNr: element.dexNr,
        generation: element.generation,
        name: element.names.English,
        primaryType: element.primaryType.names.English,
        secondaryType: element.secondaryType ? element.secondaryType.names.English : null,
        image: element.assets ? element.assets.image : null,
      };
      pokemonDataMin.push(pokemon);
    });

    writeFile(filepath, JSON.stringify(pokemonDataMin, null, 2), () => {});
    console.log("Pokemon Index JSON Written to", filepath);
  } catch (error) {
    console.log("Failed to get pokemon data", error);
    process.exit();
  }
}

getPokemonIndex();
