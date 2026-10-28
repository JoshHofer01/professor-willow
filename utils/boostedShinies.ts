import manualBoosts from "@/data/boostedShinies.json";
import { CommunityDayPokemon, GameEvent, ShiniesProps } from "@/interfaces/interfaces";
import { getPkmnImgUrl } from "./getPkmnImgUrl";
import { findPokemonByDexNr, findPokemonByName, pokemonHref } from "./pokedex";
import { weServTransformURL } from "./weServTransform";

/** A hand-maintained boost, for events ScrapedDuck doesn't describe. */
interface ManualBoost {
  dexNr: number;
  name: string;
  /** ISO date; without an offset it means the player's local time. */
  startDate: string;
  endDate: string;
}

function shinyFromDex(dexNr: number, name: string, startDate: string, endDate: string): ShiniesProps {
  const pokemon = findPokemonByDexNr(dexNr);
  return {
    id: `${dexNr}-${startDate}`,
    name,
    image: weServTransformURL(getPkmnImgUrl(dexNr, true), "pokedexImage"),
    href: pokemon ? pokemonHref(pokemon.id) : null,
    startDate,
    endDate,
  };
}

function shinyFromCommunityDay(
  spawn: CommunityDayPokemon,
  shinies: CommunityDayPokemon[],
  event: GameEvent,
): ShiniesProps {
  const pokemon = findPokemonByName(spawn.name);
  if (pokemon) return shinyFromDex(pokemon.dexNr, pokemon.name, event.start, event.end);

  // Not in the index (e.g. a regional form): use LeekDuck's shiny image.
  const shinyImage = shinies.find((shiny) => shiny.name === spawn.name)?.image ?? spawn.image;
  return {
    id: `${spawn.name}-${event.start}`,
    name: spawn.name,
    image: weServTransformURL(shinyImage, "pokedexImage"),
    href: null,
    startDate: event.start,
    endDate: event.end,
  };
}

/**
 * Pokémon with boosted shiny odds, from two sources:
 * - Community Days in the event feed: their featured spawns, for the
 *   event's window (evolutions in the shiny list aren't boosted).
 * - data/boostedShinies.json, for anything else.
 *
 * Returns every window; the client keeps the ones live for the viewer.
 */
export function getBoostedShinies(
  events: GameEvent[],
  manual: ManualBoost[] = manualBoosts,
): ShiniesProps[] {
  const fromEvents = events.flatMap((event) => {
    const communityDay = event.extraData?.communityday;
    if (event.eventType !== "community-day" || !event.start || !event.end || !communityDay) {
      return [];
    }
    return (communityDay.spawns ?? []).map((spawn) =>
      shinyFromCommunityDay(spawn, communityDay.shinies ?? [], event),
    );
  });

  const fromManual = manual.map((boost) =>
    shinyFromDex(boost.dexNr, boost.name, boost.startDate, boost.endDate),
  );

  const unique = new Map([...fromEvents, ...fromManual].map((shiny) => [shiny.id, shiny]));
  return [...unique.values()];
}
