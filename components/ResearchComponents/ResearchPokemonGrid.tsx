import { Reward } from "@/interfaces/interfaces";
import { weServTransformURL } from "@/utils/weServTransform";
import Image from "next/image";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";

const ResearchPokemonGrid = ({ rewards }: { rewards: Reward[] }) => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-3 xl:grid-cols-4">
      {rewards.map((pokemon) => (
        <Popover key={pokemon.name}>
          <PopoverTrigger>
            <div className="relative w-18 h-18 m-1 hover:cursor-pointer">
              <Image
                src={weServTransformURL(pokemon.image, "pokedexImage")}
                alt={pokemon.name}
                fill
                sizes="80px"
                className="object-contain"
              />
              {pokemon.canBeShiny && (
                <div className="absolute top-0 right-0 flex gap-1 z-6 bg-background/80 rounded-sm mt-1 p-1">
                  <Image
                    src="/GoldSparkles.png"
                    width={12}
                    height={12}
                    alt="Possible Shiny"
                    title="Possible Shiny from Raid"
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div className="flex flex-col items-center text-center">
              <p className="font-semibold">{pokemon.name}</p>
              <p>100% CP: {pokemon.combatPower.max}</p>
              {pokemon.canBeShiny && (
                <p className="text-yellow-400 font-semibold text-xs">
                  Can be shiny!
                </p>
              )}
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default ResearchPokemonGrid;
