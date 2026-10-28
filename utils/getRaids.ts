import {
  Assets,
  BattlePokemon,
  MaxBattle,
  Raid,
  RaidPokemon,
} from "@/interfaces/interfaces";
import * as Sentry from "@sentry/nextjs";
import pokemonData from "@/data/pokemonIndex.json";
import { fetchJson } from "./fetchJson";
import { getPkmnImgUrl } from "./getPkmnImgUrl";

const pokedexLookup = new Map(
  pokemonData.map((pokemon) => [pokemon.name.toLowerCase(), pokemon]),
);

export async function getRaids() {
  const raids = await fetchJson<Raid>(
    "https://pokemon-go-api.github.io/pokemon-go-api/api/raidboss.json",
    { source: "getRaids", revalidate: 600 },
  );
  if (!raids) return null;

  try {
    const augmentRaids = (raid: RaidPokemon, isShadow: boolean) => {
      const fixedAssets = fixBattleAssets(raid.assets, raid.id);

      return {
        ...raid,
        shadow: isShadow,
        assets: fixedAssets,
      };
    };

    const tier5: RaidPokemon[] = [
      ...(raids.currentList.lvl5 || []).map((raid) =>
        augmentRaids(raid, false),
      ),
      ...(raids.currentList.shadow_lvl5 || []).map((raid) =>
        augmentRaids(raid, true),
      ),
      ...(raids.currentList.ultra_beast || []).map((raid) =>
        augmentRaids(raid, false),
      ),
    ];

    const tier3: RaidPokemon[] = [
      ...(raids.currentList.lvl3 || []).map((raid) =>
        augmentRaids(raid, false),
      ),
      ...(raids.currentList.shadow_lvl3 || []).map((raid) =>
        augmentRaids(raid, true),
      ),
    ];

    const tier1: RaidPokemon[] = [
      ...(raids.currentList.lvl1 || []).map((raid) =>
        augmentRaids(raid, false),
      ),
      ...(raids.currentList.shadow_lvl1 || []).map((raid) =>
        augmentRaids(raid, true),
      ),
    ];

    const mega: RaidPokemon[] = [
      ...(raids.currentList.mega || []).map((raid) =>
        augmentRaids(raid, false),
      ),
      ...(raids.currentList.legendary_mega || []).map((raid) =>
        augmentRaids(raid, false),
      ),
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
  const maxBattles = await fetchJson<MaxBattle>(
    "https://pokemon-go-api.github.io/pokemon-go-api/api/maxbattles.json",
    { source: "getMaxBattles", revalidate: 600 },
  );
  if (!maxBattles) return null;

  try {
    const augmentBattles = (battle: BattlePokemon, isShadow: boolean) => {
      const fixedAssets = fixBattleAssets(battle.assets, battle.id);

      return {
        ...battle,
        shadow: isShadow,
        assets: fixedAssets,
      };
    };

    const tier1: BattlePokemon[] = (maxBattles.currentList.tier_1 || []).map(
      (battle) => augmentBattles(battle, false),
    );
    const tier2: BattlePokemon[] = (maxBattles.currentList.tier_2 || []).map(
      (battle) => augmentBattles(battle, false),
    );
    const tier3: BattlePokemon[] = (maxBattles.currentList.tier_3 || []).map(
      (battle) => augmentBattles(battle, false),
    );
    const tier4: BattlePokemon[] = (maxBattles.currentList.tier_4 || []).map(
      (battle) => augmentBattles(battle, false),
    );
    const tier5: BattlePokemon[] = (maxBattles.currentList.tier_5 || []).map(
      (battle) => augmentBattles(battle, false),
    );
    const tier6: BattlePokemon[] = (maxBattles.currentList.tier_6 || []).map(
      (battle) => augmentBattles(battle, false),
    );

    const maxBattleCount =
      tier1.length +
      tier2.length +
      tier3.length +
      tier4.length +
      tier5.length +
      tier6.length;

    return { tier1, tier2, tier3, tier4, tier5, tier6, maxBattleCount };
  } catch (error) {
    Sentry.captureException(error, {
      extra: { source: "getMaxBattles" },
    });
  }
  return null;
}

function fixBattleAssets(assets: Assets, name: string) {
  const pokemon = pokedexLookup.get(name.toLowerCase());

  let fixedAssets = assets; // Fallback
  if (pokemon) {
    fixedAssets = {
      image: getPkmnImgUrl(pokemon.dexNr),
      shinyImage: getPkmnImgUrl(pokemon.dexNr, true),
    };
  }

  return fixedAssets;
}
