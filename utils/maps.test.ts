// @vitest-environment node
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import pokemonIndex from "@/data/pokemonIndex.json";
import { eventTypeColorMap, pokemonTypeColorMap, weatherToImage } from "./maps";

const POKEMON_TYPES = [
  "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground",
  "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy",
];

// Every weather value the raid API returned on 28 Oct 2026.
const API_WEATHER = ["rain", "windy", "sunny", "partlycloudy_day", "fog", "snow", "cloudy"];

describe("weatherToImage", () => {
  it.each(Object.entries(weatherToImage))("%s points at an existing file (%s)", (_, path) => {
    expect(existsSync(join(process.cwd(), "public", path))).toBe(true);
  });

  it("maps every weather value the raid API uses", () => {
    for (const weather of API_WEATHER) {
      expect(weatherToImage, weather).toHaveProperty(weather);
    }
  });
});

describe("pokemonTypeColorMap", () => {
  it("has a colour for all 18 types", () => {
    expect(Object.keys(pokemonTypeColorMap).sort()).toEqual([...POKEMON_TYPES].sort());
  });

  it("covers every type used in the Pokédex index", () => {
    const used = new Set(
      pokemonIndex.flatMap((p) => [p.primaryType, p.secondaryType].filter(Boolean) as string[]),
    );
    for (const type of used) expect(pokemonTypeColorMap, type).toHaveProperty(type);
  });

  it("uses Tailwind background classes", () => {
    for (const value of Object.values(pokemonTypeColorMap)) expect(value).toMatch(/^bg-/);
  });
});

describe("eventTypeColorMap", () => {
  it.each(["community-day", "raid-hour", "raid-battles", "pokemon-spotlight-hour", "event"])(
    "has a colour for %s",
    (type) => {
      expect(eventTypeColorMap[type]).toMatch(/^bg-/);
    },
  );
});
