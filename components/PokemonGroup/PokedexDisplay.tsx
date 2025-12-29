import Link from "next/link";
import Image from "next/image";
import { PokemonDataMin } from "@/interfaces/interfaces";

export const PokedexDisplay = ({ data }: { data: PokemonDataMin[]}) => {
  return (
    <>
      {data.map((pokemon) =>
        pokemon.image != null ? (
          <Link
            href={`/pokemon/${pokemon.dexNr}`}
            key={pokemon.dexNr}
            className="max-w-max"
          >
            <div className="items-center max-w-28 border-b-2 rounded-lg">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={300}
                height={300}
                className="overflow-hidden h-20 object-scale-down p-1"
              />
              <div className="text-xs flex flex-col gap-1 m-2 min-w-fit truncate text-center">
                <p className="text-muted-foreground">#{pokemon.dexNr}</p>
                <p>{pokemon.name}</p>
              </div>
            </div>
          </Link>
        ) : null
      )}
    </>
  );
};
