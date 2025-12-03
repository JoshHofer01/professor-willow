import { PokedexDisplay } from "@/components/ClientComponents/PokedexDisplay";
import ErrorPage from "@/components/ErrorPage";
import { Card } from "@/components/ui/card";
import { getAllPokemon, getPokemonByGeneration } from "@/utils/getPokemon";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Pokemon = async () => {
  const result = await getPokemonByGeneration('1');
  if (!result) {
    return <ErrorPage message="Test" />;
  }

  const { pokemonData } = result;

  return (
    <main className="container max-w-full p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Pokedex</h1>
        <p className="text-lg text-muted-foreground">
          Stay up to date with live, upcoming, and past events.
        </p>
      </div>
      <div>
        SEARCH AND FILTER AREA
        <p>Search</p>
        <p>Filter by Generation</p>
        <p>Filter by Type</p>
      </div>
      <PokedexDisplay data={pokemonData} />
    </main>
  );
};

export default Pokemon;
