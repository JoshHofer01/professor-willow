import { Raid, RaidPokemon } from "@/interfaces/interfaces";
import * as Sentry from "@sentry/nextjs";

export async function getRaids() {
  try {
    const response = await fetch(
      "https://pokemon-go-api.github.io/pokemon-go-api/api/raidboss.json",
    );

    if (!response.ok) {
      Sentry.captureException(`Failed to fetch pokemon, ${response.status}`);
      return null;
    }

    const raids: Raid = await response.json();

    const tier5: RaidPokemon[] = [
      ...(raids.currentList.lvl5 || []),
      ...(raids.currentList.shadow_lvl5 || []),
      ...(raids.currentList.ultra_beast || [])
    ];

    const tier3: RaidPokemon[] = [
      ...(raids.currentList.lvl3 || []),
      ...(raids.currentList.shadow_lvl3 || [])
    ];

    const tier1: RaidPokemon[] = [
      ...(raids.currentList.lvl1 || []),
      ...(raids.currentList.shadow_lvl1 || [])
    ];

    const mega: RaidPokemon[] = [
      ...(raids.currentList.mega || []),
      ...(raids.currentList.legendary_mega || [])
    ];

    return { tier5, tier3, tier1, mega };
  } catch (error) {
    Sentry.captureException(error, {
      extra: { source: "getRaids" },
    });
    return null;
  }
}
