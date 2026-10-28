import {
  Assets,
  BattlePokemon,
  MaxBattle,
  MaxBattleList,
  Raid,
  RaidList,
  RaidPokemon,
} from "@/interfaces/interfaces";
import * as Sentry from "@sentry/nextjs";
import { fetchJson } from "./fetchJson";
import { getPkmnImgUrl } from "./getPkmnImgUrl";
import { findPokemonById } from "./pokedex";

/** API lists that make up each raid tier shown on the site. */
const RAID_TIERS = {
  tier5: ["lvl5", "shadow_lvl5", "ultra_beast"],
  tier3: ["lvl3", "shadow_lvl3"],
  tier1: ["lvl1", "shadow_lvl1"],
  mega: ["mega", "legendary_mega"],
} as const satisfies Record<string, readonly (keyof RaidList)[]>;

const MAX_BATTLE_TIERS = [
  "tier_1",
  "tier_2",
  "tier_3",
  "tier_4",
  "tier_5",
  "tier_6",
] as const satisfies readonly (keyof MaxBattleList)[];

export async function getRaids() {
  const raids = await fetchJson<Raid>(
    "https://pokemon-go-api.github.io/pokemon-go-api/api/raidboss.json",
    { source: "getRaids", revalidate: 600 },
  );
  if (!raids) return null;

  try {
    // Merge the API's lists into a tier; bosses from shadow_ lists are shadow.
    const buildTier = (lists: readonly (keyof RaidList)[]): RaidPokemon[] =>
      lists.flatMap((list) =>
        (raids.currentList[list] || []).map((raid) =>
          withLocalAssets(raid, list.startsWith("shadow_")),
        ),
      );

    return {
      tier5: buildTier(RAID_TIERS.tier5),
      tier3: buildTier(RAID_TIERS.tier3),
      tier1: buildTier(RAID_TIERS.tier1),
      mega: buildTier(RAID_TIERS.mega),
    };
  } catch (error) {
    Sentry.captureException(error, {
      extra: { source: "getRaids" },
    });
    return null;
  }
}

export async function getMaxBattles() {
  const maxBattles = await fetchJson<MaxBattle>(
    "https://pokemon-go-api.github.io/pokemon-go-api/api/maxbattles.json",
    { source: "getMaxBattles", revalidate: 600 },
  );
  if (!maxBattles) return null;

  try {
    // currentList is an empty array, not an object, when nothing is on.
    const buildTier = (list: keyof MaxBattleList): BattlePokemon[] =>
      (maxBattles.currentList[list] || []).map((battle) => withLocalAssets(battle, false));

    const [tier1, tier2, tier3, tier4, tier5, tier6] = MAX_BATTLE_TIERS.map(buildTier);
    const maxBattleCount = [tier1, tier2, tier3, tier4, tier5, tier6].reduce(
      (count, tier) => count + tier.length,
      0,
    );

    return { tier1, tier2, tier3, tier4, tier5, tier6, maxBattleCount };
  } catch (error) {
    Sentry.captureException(error, {
      extra: { source: "getMaxBattles" },
    });
  }
  return null;
}

/** Sets `shadow` and swaps in sprites from the local index when it knows the boss. */
function withLocalAssets<T extends RaidPokemon | BattlePokemon>(boss: T, shadow: boolean): T {
  const pokemon = findPokemonById(boss.id);
  const assets: Assets = pokemon
    ? {
        image: getPkmnImgUrl(pokemon.dexNr),
        shinyImage: getPkmnImgUrl(pokemon.dexNr, true),
      }
    : boss.assets;

  return { ...boss, shadow, assets };
}
