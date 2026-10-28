// npm run pokemon:index
// Recommended to run minimally once per Pokemon GO update cycle

import { writeFile } from "fs/promises";

const filepath = "data/pokemonIndex.json";

async function getPokemonIndex() {
  const response = await fetch(
    "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json"
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch pokemon: ${response.status}`);
  }

  const pokemonData = await response.json();

  // Filter data into PokemonDataMin type
  const pokemonDataMin = pokemonData.map((element) => ({
    id: element.id,
    dexNr: element.dexNr,
    generation: element.generation,
    name: element.names.English,
    primaryType: element.primaryType.names.English,
    secondaryType: element.secondaryType ? element.secondaryType.names.English : null,
    image: element.assets ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element.dexNr}.png` : null,
  }));

  await writeFile(filepath, JSON.stringify(pokemonDataMin, null, 2));
  console.log("Pokemon Index JSON Written to", filepath);
}

getPokemonIndex().catch((error) => {
  console.error("Failed to get pokemon data:", error);
  process.exit(1);
});
