"use client";

import { PokedexDisplay } from "@/components/PokemonGroup/PokedexDisplay";
import pokemonData from "@/data/pokemonIndex.json";
import { PokemonDataMin } from "@/interfaces/interfaces";
import { FilterBox } from "@/components/ClientComponents/SearchFilterBox";
import { useState } from "react";

function filterPokedex(
  data: PokemonDataMin[],
  filterType: string,
  filterGeneration: string
) {
  if (filterType && filterGeneration) {
    return data.filter(
      (p) =>
        (p.primaryType === filterType || p.secondaryType === filterType) &&
        p.generation.toString() === filterGeneration
    );
  } else if (filterType && !filterGeneration) {
    return data.filter((p) => p.primaryType === filterType);
  } else if (!filterType && filterGeneration) {
    return data.filter((p) => p.generation.toString() === filterGeneration);
  }
  return data;
}

const Pokemon = () => {
  const data: PokemonDataMin[] = pokemonData;
  const [filterGeneration, setFilterGeneration] = useState("");
  const [filterType, setFilterType] = useState("");

  const pokedex = filterPokedex(data, filterType, filterGeneration);

  return (
    <main className="container max-w-full p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Pokedex</h1>
        <p className="text-lg text-muted-foreground">
          Entire Pokedex of Pokemon currently available in Pokemon GO
        </p>
        <p className="text-sm text-muted-foreground">
          Use filters for a refined search, or navigate to more detailed stats
          by selecting a Pokemon.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <p className="text-lg font-semibold">Filter by:</p>
        <FilterBox dataType="type" setFilter={setFilterType} />
        <FilterBox dataType="generation" setFilter={setFilterGeneration} />
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 max-w-[1400px] mx-auto">
        {pokedex && <PokedexDisplay data={pokedex} />}
      </div>
    </main>
  );
};

export default Pokemon;
