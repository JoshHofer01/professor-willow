"use client";

import { useEffect, useState } from "react";
import { Spinner } from "../shadcn/spinner";
import { ShiniesProps } from "@/interfaces/interfaces";
import Link from "next/link";
import Image from "next/image";

export const LiveShiniesDisplay = ({boostedShinies}: {boostedShinies: ShiniesProps[]}) => {

  const [liveBoostedShinies, setLiveBoostedShinies] = useState<
    ShiniesProps[] | null
  >(null);

  useEffect(() => {
    const getLiveShinies = () => {
      const now = new Date();
      const filteredShinies = boostedShinies.filter(
        (pokemon) => now > new Date(pokemon.startDate) && now < new Date(pokemon.endDate),
      );
      setLiveBoostedShinies(filteredShinies);
    };

    getLiveShinies();

    // Refresh every 5 mins page hasn't been reloaded
    const interval = setInterval(getLiveShinies, 5 * 60000);
    return () => clearInterval(interval);
  }, []);

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

const MapShinies = ({ shinies }: { shinies: ShiniesProps[] }) => {
  return (
    <>
      {shinies.length ? (
        <>
          {shinies.map((pokemon) => (
            <div
              key={pokemon.dexNr}
              className="bg-muted flex items-center justify-center p-1"
            >
              <Link
                href={`/pokemon/${pokemon.name}`}
                className="flex items-center justify-center h-full"
              >
                {pokemon.image ? (
                  <div>
                    <Image
                      src={pokemon.image}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                      className="object-scale-down max-h-18 max-w-18"
                    />
                  </div>
                ) : (
                  <Image
                    src="/QuestionMark.png"
                    alt="Question Mark"
                    width={64}
                    height={64}
                    className=""
                  />
                )}
              </Link>
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


