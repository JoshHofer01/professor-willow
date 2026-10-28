"use client";

import { useMemo } from "react";
import { Spinner } from "../shadcn/spinner";
import { ShiniesProps } from "@/interfaces/interfaces";
import Link from "next/link";
import Image from "next/image";
import { useNow } from "@/hooks/use-now";

export const LiveShiniesDisplay = ({ boostedShinies }: { boostedShinies: ShiniesProps[] }) => {
  // Boost windows are in the viewer's local time, so filter in the browser.
  const now = useNow();
  const liveBoostedShinies = useMemo(
    () =>
      now &&
      boostedShinies.filter(
        (pokemon) => now >= new Date(pokemon.startDate) && now < new Date(pokemon.endDate),
      ),
    [boostedShinies, now],
  );

  return (
    <>
      {liveBoostedShinies === null ? (
        <div className="col-span-full flex justify-center items-center h-18">
          <Spinner />
        </div>
      ) : (
        <MapShinies shinies={liveBoostedShinies} />
      )}
    </>
  );
};

const ShinyImage = ({ pokemon }: { pokemon: ShiniesProps }) => (
  <Image
    src={pokemon.image}
    alt={pokemon.name}
    width={96}
    height={96}
    className="object-scale-down max-h-20 max-w-20"
  />
);

const MapShinies = ({ shinies }: { shinies: ShiniesProps[] }) => {
  return (
    <>
      {shinies.length ? (
        <>
          {shinies.map((pokemon) => (
            <div
              key={pokemon.id}
              className="flex items-center justify-center p-1"
            >
              {pokemon.href ? (
                <Link
                  href={pokemon.href}
                  className="flex items-center justify-center h-full"
                >
                  <ShinyImage pokemon={pokemon} />
                </Link>
              ) : (
                <ShinyImage pokemon={pokemon} />
              )}
            </div>
          ))}
        </>
      ) : (
        <div className="flex col-span-full items-center justify-center h-18 bg-linear-to-b from-foreground/10 to-card rounded-lg">
          <span className="text-md sm:text-lg px-1 font-semibold">
            No Boosted Shinies
          </span>
        </div>
      )}
    </>
  );
};
