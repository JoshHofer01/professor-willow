import { weatherToImage } from "@/utils/maps";
import Image from "next/image";
import React from "react";

const WeatherIndicators = ({ weather }: { weather: string[] }) => {
  return (
    <div className="absolute top-2 left-2 flex gap-1 z-6 bg-background/20 rounded-sm mt-1 p-1">
      <div className="inline-flex">
        {weather.map((weatherType) => (
          <Image
            src={weatherToImage[weatherType]}
            key={weatherType}
            alt={weatherType}
            width={24}
            height={24}
            className="object-scale-down"
            title={weatherType}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherIndicators;
