// @vitest-environment node
import { describe, expect, it } from "vitest";
import manualBoosts from "@/data/boostedShinies.json";
import { makeEvent } from "@/test/fixtures/events";
import { getBoostedShinies } from "./boostedShinies";
import { getPkmnImgUrl } from "./getPkmnImgUrl";

const cdn = "https://cdn.leekduck.com/assets/img/pokemon_icons";

const communityDay = (spawns: string[], shinies = spawns) =>
  makeEvent({
    name: "Pawniard Community Day",
    eventType: "community-day",
    start: "2026-11-21T14:00:00.000",
    end: "2026-11-21T17:00:00.000",
    extraData: {
      communityday: {
        spawns: spawns.map((name) => ({ name, image: `${cdn}/${name}.png` })),
        shinies: shinies.map((name) => ({ name, image: `${cdn}/${name}_shiny.png` })),
      },
    },
  });

describe("getBoostedShinies", () => {
  it("boosts a Community Day's featured spawns for the event window", () => {
    const [pawniard] = getBoostedShinies([communityDay(["Pawniard"])], []);

    expect(pawniard).toMatchObject({
      name: "Pawniard",
      href: "/pokemon/pawniard",
      startDate: "2026-11-21T14:00:00.000",
      endDate: "2026-11-21T17:00:00.000",
    });
    expect(decodeURIComponent(pawniard.image)).toContain(getPkmnImgUrl(624, true));
  });

  it("doesn't boost evolutions that are only in the shiny list", () => {
    const shinies = getBoostedShinies(
      [communityDay(["Pawniard"], ["Pawniard", "Bisharp", "Kingambit"])],
      [],
    );
    expect(shinies.map((s) => s.name)).toEqual(["Pawniard"]);
  });

  it("ignores events that aren't Community Days", () => {
    const event = { ...communityDay(["Pawniard"]), eventType: "event" };
    expect(getBoostedShinies([event], [])).toEqual([]);
  });

  it("ignores Community Days without spawn data or dates", () => {
    const noData = makeEvent({ eventType: "community-day" });
    const noDates = { ...communityDay(["Pawniard"]), start: null as unknown as string };
    expect(getBoostedShinies([noData, noDates], [])).toEqual([]);
  });

  it("uses LeekDuck's shiny image for Pokémon missing from the index", () => {
    const [shiny] = getBoostedShinies([communityDay(["Alolan Grimer"])], []);

    expect(shiny.href).toBeNull();
    expect(decodeURIComponent(shiny.image)).toContain(`${cdn}/Alolan Grimer_shiny.png`);
  });

  it("includes the hand-maintained list", () => {
    const shinies = getBoostedShinies([], [
      { dexNr: 522, name: "Blitzle", startDate: "2026-02-17T10:00:00", endDate: "2026-02-21T20:00:00" },
    ]);

    expect(shinies).toEqual([
      expect.objectContaining({ name: "Blitzle", href: "/pokemon/blitzle", startDate: "2026-02-17T10:00:00" }),
    ]);
  });

  it("merges both sources without duplicates", () => {
    const shinies = getBoostedShinies([communityDay(["Pawniard"])], [
      { dexNr: 624, name: "Pawniard", startDate: "2026-11-21T14:00:00.000", endDate: "2026-11-21T17:00:00.000" },
      { dexNr: 522, name: "Blitzle", startDate: "2026-02-17T10:00:00", endDate: "2026-02-21T20:00:00" },
    ]);
    expect(shinies.map((s) => s.name)).toEqual(["Pawniard", "Blitzle"]);
  });

  it("gives every entry a unique id", () => {
    const shinies = getBoostedShinies([communityDay(["Pawniard", "Machop"])]);
    expect(new Set(shinies.map((s) => s.id)).size).toBe(shinies.length);
  });
});

describe("data/boostedShinies.json", () => {
  it("has a known dex number, a name and valid dates for every entry", () => {
    for (const boost of manualBoosts) {
      expect(Number.isInteger(boost.dexNr), boost.name).toBe(true);
      expect(Number.isNaN(new Date(boost.startDate).getTime()), boost.name).toBe(false);
      expect(new Date(boost.endDate) > new Date(boost.startDate), boost.name).toBe(true);
    }
  });
});
