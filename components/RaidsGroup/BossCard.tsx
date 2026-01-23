import { BattlePokemon, RaidPokemon } from "@/interfaces/interfaces";
import React from "react";
import SpecialRaidIndicators from "./SpecialRaidIndicators";
import Image from "next/image";
import { PokemonTypeBadge } from "../PokemonGroup/PokemonIdDisplays";
import { weServTransformURL } from "@/utils/weServTransform";
import WeatherIndicators from "./WeatherIndicators";
import Link from "next/link";

const BossCard = ({
  raidBoss,
  children,
  weather,
}: {
  raidBoss: RaidPokemon | BattlePokemon;
  children?: React.ReactNode;
  weather?: string[]
}) => {
  return (
    <div
      key={raidBoss.names.English}
      className="relative flex flex-col items-center rounded-xl border-b-4 border-x p-3 w-full"
    >
      {/* Shadow and Shiny indicators */}
      <SpecialRaidIndicators
        isShadow={raidBoss.shadow}
        isShiny={raidBoss.shiny}
      />

      {weather && (
        <WeatherIndicators weather={weather} />
      )}

      {/* Image */}
      <div className="relative w-20 h-20">
        <Link href={`/pokemon/${raidBoss.id.toLowerCase()}`}>
        <Image
          src={weServTransformURL(raidBoss.assets.image, "pokedexImage")}
          alt={raidBoss.names.English}
          fill
          sizes="80px"
          className="object-contain"
        />
        </Link>
      </div>

      <hr className="gap-y-2" />

      {/* Name */}
      <div className={`${children ? "text-2xl" : "text-sm"} mt-2 text-center font-semibold`}>
        {raidBoss.names.English}
      </div>

      {/* Types */}
      <div className={`${children ? "flex-row" : "flex-row sm:flex-col"} flex  gap-1 mt-1 justify-center items-center`}>
        {raidBoss.types.map((type) => (
          <div key={type}>
            <PokemonTypeBadge type={type} />
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export default BossCard;
