"use client"

import Link from "next/link";
import Image from "next/image";
import { PokemonData } from "@/interfaces/interfaces";

export const PokedexDisplay = ({ data }: { data: PokemonData[] }) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 max-w-[1400px] mx-auto">
      {data.map((pokemon) =>
        pokemon.assets.image != "/QuestionMark.png" ? (
          <Link href={`/pokemon/${pokemon.dexNr}`} key={pokemon.id}>
            <div className="items-center max-w-28 border-b-2 rounded-lg">
              <Image
                src={pokemon.assets.image}
                alt=""
                width={1000}
                height={50}
                className="overflow-hidden h-20 object-scale-down p-1"
                loading="eager"
              />
              <div className="text-xs flex flex-col gap-1 m-2 min-w-fit truncate text-center">
                <p className="text-muted-foreground">#{pokemon.dexNr}</p>
                <p>{pokemon.names.English}</p>
              </div>
            </div>
          </Link>
        ) : null
      )}
    </div>
  );
};