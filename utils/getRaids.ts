import { BattlePokemon, MaxBattle, Raid, RaidPokemon } from "@/interfaces/interfaces";
import * as Sentry from "@sentry/nextjs";

export async function getRaids() {
  try {
    const response = await fetch(
      "https://pokemon-go-api.github.io/pokemon-go-api/api/raidboss.json",
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      Sentry.captureException(`Failed to fetch pokemon, ${response.status}`);
      return null;
    }

    const raids: Raid = await response.json();

    const tier5: RaidPokemon[] = [
      ...(raids.currentList.lvl5 || []).map((raid) => ({...raid, shadow: false})),
      ...(raids.currentList.shadow_lvl5 || []).map((raid) => ({...raid, shadow: true})),
      ...(raids.currentList.ultra_beast || []).map((raid) => ({...raid, shadow: false}))
    ];

    const tier3: RaidPokemon[] = [
      ...(raids.currentList.lvl3 || []).map((raid) => ({...raid, shadow: false})),
      ...(raids.currentList.shadow_lvl3 || []).map((raid) => ({...raid, shadow: true}))
    ];

    const tier1: RaidPokemon[] = [
      ...(raids.currentList.lvl1 || []).map((raid) => ({...raid, shadow: false})),
      ...(raids.currentList.shadow_lvl1 || []).map((raid) => ({...raid, shadow: true}))
    ];

    const mega: RaidPokemon[] = [
      ...(raids.currentList.mega || []).map((raid) => ({...raid, shadow: false})),
      ...(raids.currentList.legendary_mega || []).map((raid) => ({...raid, shadow: false}))
    ];

    return { tier5, tier3, tier1, mega };
  } catch (error) {
    Sentry.captureException(error, {
      extra: { source: "getRaids" },
    });
    return null;
  }
}

export async function getMaxBattles() {
  try {
    const response = await fetch(
      "https://pokemon-go-api.github.io/pokemon-go-api/api/maxbattles.json",
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      Sentry.captureException(
        `Failed to fetch Max Battles from API, ${response.status}`,
      );
    }

    const maxBattles: MaxBattle = await response.json();
  
    const tier1: BattlePokemon[] = (maxBattles.currentList.tier_1 || []).map((battle) => ({...battle, shadow: false}));
    const tier2: BattlePokemon[] = (maxBattles.currentList.tier_2 || []).map((battle) => ({...battle, shadow: false}));
    const tier3: BattlePokemon[] = (maxBattles.currentList.tier_3 || []).map((battle) => ({...battle, shadow: false}));
    const tier4: BattlePokemon[] = (maxBattles.currentList.tier_4 || []).map((battle) => ({...battle, shadow: false}));
    const tier5: BattlePokemon[] = (maxBattles.currentList.tier_5 || []).map((battle) => ({...battle, shadow: false}));
    const tier6: BattlePokemon[] = (maxBattles.currentList.tier_6 || []).map((battle) => ({...battle, shadow: false}));

    const maxBattleCount = (tier1.length + tier2.length + tier3.length + tier4.length + tier5.length + tier6.length);

    return { tier1, tier2, tier3, tier4, tier5, tier6, maxBattleCount };

  } catch (error) {
    Sentry.captureException(error, {
      extra: { source: "getMaxBattles" },
    });
  }
  return null;
}