"use client"
import Link from "next/link";
import Image from "next/image";
import { PokemonDataMin } from "@/interfaces/interfaces";
import { weServTransformURL } from "@/utils/weServTransform";
import { FilterBox } from "../ClientComponents/SearchFilterBox";
import pokemonData from "@/data/pokemonIndex.json";
import { useRouter, useSearchParams } from "next/navigation";

function filterPokedex(
  data: PokemonDataMin[],
  filterType: string,
  filterGeneration: string
) {
  if (filterGeneration === "0") {
    return data;
  }

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

export const PokedexDisplay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data: PokemonDataMin[] = pokemonData;

  const filterGeneration = searchParams.get("gen") ?? "1";
  const filterType = searchParams.get("type") ?? "";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };
  const pokedex = filterPokedex(data, filterType, filterGeneration);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4">
        <p className="text-lg font-semibold">Filter by:</p>
        <FilterBox
          dataType="type"
          setFilter={(val) => updateFilter("type", val)}
        />
        <FilterBox
          dataType="generation"
          setFilter={(val) => updateFilter("gen", val)}
        />
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2 max-w-350 mx-auto">
        {pokedex.map((pokemon) =>
          pokemon.image != null ? (
            <Link
              href={`/pokemon/${pokemon.name}`}
              key={pokemon.dexNr}
              className="max-w-max"
            >
              <div className="items-center max-w-28 border-b-2 rounded-lg">
                <Image
                  src={weServTransformURL(pokemon.image, "pokedexImage")}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                  className="overflow-hidden h-20 object-scale-down p-1"
                />
                <div className="text-xs flex flex-col gap-1 m-2 min-w-fit truncate text-center">
                  <p className="text-muted-foreground">#{pokemon.dexNr}</p>
                  <p className="text-[9px] sm:text-xs">{pokemon.name}</p>
                </div>
              </div>
            </Link>
          ) : null
        )}
      </div>
    </>
  );
};
