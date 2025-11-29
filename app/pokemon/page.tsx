import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PokemonData {
  id: string;
  dexNr: string;
  names: {
    English: string;
  };
  assets: {
    image: string;
    shiny: string;
  };
}

const Pokemon = async () => {
  const response = await fetch(
    "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/generation/4.json"
  );
  const data: PokemonData[] = await response.json();


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
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 3xl:grid-cols-9 gap-3sm gap-3">
        {data.map((pokemon) =>
        pokemon.assets !== null ? (
          <Link href={`/pokemon/${pokemon.dexNr}`} key={pokemon.id}>

          <Card className="items-center max-w-48">
            <Image
              src={pokemon.assets.image}
              alt=""
              width={1000}
              height={50}
              className="overflow-hidden h-17 object-scale-down p-1"
              loading="eager"
            />
            <div className="text-xs flex flex-col gap-1 m-2 min-w-fit truncate">
              <p>{pokemon.names.English}</p>
            </div>
            <div></div>
          </Card>
          </Link>
        ) : null)}
      </div>
    </main>
  );
};

export default Pokemon;
