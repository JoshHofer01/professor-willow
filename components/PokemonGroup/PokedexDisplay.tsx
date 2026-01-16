"use client";

import { PokemonDataMin } from "@/interfaces/interfaces";
import { FilterBox, SearchBox } from "../ClientComponents/SearchFilterBox";
import pokemonData from "@/data/pokemonIndex.json";
import { useRouter, useSearchParams } from "next/navigation";
import BackToTopButton from "../ClientComponents/BackToTopButton";
import { useDebounce } from "@uidotdev/usehooks";
import PokedexResults from "./PokedexResults";
import { useEffect, useState } from "react";

function filterPokedex(
  filterQuery: string,
  filterType?: string,
  filterGeneration?: string
) {
  const data: PokemonDataMin[] = pokemonData;

  return data.filter((p) => {
    let matchesType = true;
    if (filterType) {
      matchesType =
        p.primaryType === filterType || p.secondaryType === filterType;
    }

    let matchesGeneration = true;
    if (filterGeneration && filterGeneration !== "all") {
      matchesGeneration = p.generation.toString() === filterGeneration;
    }

    let matchesQuery = true;
    if (filterQuery) {
      matchesQuery = p.name.toLowerCase().includes(filterQuery.toLowerCase());
    }

    return matchesType && matchesGeneration && matchesQuery;
  });
}

export const PokedexDisplay = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterGeneration = searchParams.get("gen") ?? "";
  const filterType = searchParams.get("type") ?? "";
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const debouncedQuery = useDebounce(query, 750);
  const pokedex = filterPokedex(debouncedQuery, filterType, filterGeneration);

  const updateFilter = (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.push(`?${params.toString()}`);
    };

  useEffect(() => {
    const currentQuery = searchParams.get("query") ?? "";
    if (debouncedQuery !== currentQuery) {
      updateFilter("query", debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <>
      <BackToTopButton />
      <div className="flex flex-wrap gap-2 mb-4">
          <SearchBox setQuery={setQuery} initialValue={query} className="max-w-xs lg:max-w-sm min-w-52"/>
          <FilterBox
            dataType="type"
            setFilter={(val) => updateFilter("type", val)}
            initialValue={filterType}
          />
          <FilterBox
            dataType="generation"
            setFilter={(val) => updateFilter("gen", val)}
            initialValue={filterGeneration}
          />
      </div>
      <PokedexResults pokedex={pokedex} />
    </>
  );
};
