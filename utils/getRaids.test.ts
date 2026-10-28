// @vitest-environment node
import * as Sentry from "@sentry/nextjs";
import { describe, expect, it } from "vitest";
import maxBattlesFixture from "@/test/fixtures/maxbattles.json";
import raidFixture from "@/test/fixtures/raidboss.json";
import { json, mockFetch } from "@/test/mockFetch";
import { getPkmnImgUrl } from "./getPkmnImgUrl";
import { getMaxBattles, getRaids } from "./getRaids";

const RAIDS_URL = "https://pokemon-go-api.github.io/pokemon-go-api/api/raidboss.json";
const MAX_URL = "https://pokemon-go-api.github.io/pokemon-go-api/api/maxbattles.json";

const list = raidFixture.currentList;
const ids = (bosses: { id: string }[]) => bosses.map((b) => b.id);

describe("getRaids", () => {
  it("groups API lists into tiers", async () => {
    mockFetch({ [RAIDS_URL]: json(raidFixture) });

    const result = await getRaids();

    expect(result).not.toBeNull();
    expect(ids(result!.tier5)).toEqual(ids([...list.lvl5, ...list.shadow_lvl5]));
    expect(ids(result!.tier3)).toEqual(ids([...list.lvl3, ...list.shadow_lvl3]));
    expect(ids(result!.tier1)).toEqual(ids([...list.lvl1, ...list.shadow_lvl1]));
    expect(ids(result!.mega)).toEqual(ids(list.mega));
  });

  it("adds ultra beasts to tier 5 and legendary megas to mega", async () => {
    const boss = list.lvl5[0];
    mockFetch({
      [RAIDS_URL]: json({
        currentList: {
          ultra_beast: [{ ...boss, id: "NIHILEGO" }],
          legendary_mega: [{ ...boss, id: "RAYQUAZA" }],
        },
      }),
    });

    const result = await getRaids();

    expect(ids(result!.tier5)).toEqual(["NIHILEGO"]);
    expect(ids(result!.mega)).toEqual(["RAYQUAZA"]);
  });

  it("marks only bosses from shadow lists as shadow", async () => {
    mockFetch({ [RAIDS_URL]: json(raidFixture) });

    const { tier5, tier3, tier1, mega } = (await getRaids())!;
    const all = [...tier5, ...tier3, ...tier1, ...mega];
    const shadowCount =
      list.shadow_lvl5.length + list.shadow_lvl3.length + list.shadow_lvl1.length;

    expect(all.filter((b) => b.shadow)).toHaveLength(shadowCount);
    expect(tier5.slice(0, list.lvl5.length).every((b) => !b.shadow)).toBe(true);
    expect(tier5.slice(list.lvl5.length).every((b) => b.shadow)).toBe(true);
  });

  it("returns empty tiers when the API leaves lists out", async () => {
    mockFetch({ [RAIDS_URL]: json({ currentList: {} }) });
    await expect(getRaids()).resolves.toEqual({ tier5: [], tier3: [], tier1: [], mega: [] });
  });

  it("replaces boss images with sprites from the local Pokédex index", async () => {
    mockFetch({ [RAIDS_URL]: json(raidFixture) });

    const { tier5 } = (await getRaids())!;
    const giratina = tier5.find((b) => b.id === "GIRATINA")!;

    expect(giratina.assets).toEqual({
      image: getPkmnImgUrl(487),
      shinyImage: getPkmnImgUrl(487, true),
    });
  });

  it("keeps the API images when the boss isn't in the index", async () => {
    const boss = { ...list.lvl1[0], id: "MISSINGNO", assets: { image: "a.png", shinyImage: "b.png" } };
    mockFetch({ [RAIDS_URL]: json({ currentList: { lvl1: [boss] } }) });

    const { tier1 } = (await getRaids())!;

    expect(tier1[0].assets).toEqual({ image: "a.png", shinyImage: "b.png" });
  });

  it("finds bosses whose API id differs from their display name, e.g. MR_MIME [bug 1.1]", async () => {
    mockFetch({ [RAIDS_URL]: json(raidFixture) });

    const { tier1 } = (await getRaids())!;
    const mrMime = tier1.find((b) => b.id === "MR_MIME")!;

    expect(mrMime.assets.image).toBe(getPkmnImgUrl(122));
  });

  it("returns null and reports a non-OK response", async () => {
    mockFetch({ [RAIDS_URL]: new Response("nope", { status: 503 }) });
    await expect(getRaids()).resolves.toBeNull();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it("returns null and reports a network failure", async () => {
    mockFetch({ [RAIDS_URL]: new TypeError("fetch failed") });
    await expect(getRaids()).resolves.toBeNull();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });
});

describe("getMaxBattles", () => {
  const battles = maxBattlesFixture.currentList;

  it("returns all six tiers and the total count", async () => {
    mockFetch({ [MAX_URL]: json(maxBattlesFixture) });

    const result = (await getMaxBattles())!;

    expect(ids(result.tier1)).toEqual(ids(battles.tier_1));
    expect(ids(result.tier2)).toEqual(ids(battles.tier_2));
    expect(ids(result.tier3)).toEqual(ids(battles.tier_3));
    expect(result.tier4).toEqual([]);
    expect(ids(result.tier5)).toEqual(ids(battles.tier_5));
    expect(ids(result.tier6)).toEqual(ids(battles.tier_6));
    expect(result.maxBattleCount).toBe(5);
  });

  it("never marks max battle bosses as shadow", async () => {
    mockFetch({ [MAX_URL]: json(maxBattlesFixture) });
    const result = (await getMaxBattles())!;
    const all = [result.tier1, result.tier2, result.tier3, result.tier5, result.tier6].flat();
    expect(all.every((b) => b.shadow === false)).toBe(true);
  });

  it("handles today's real shape, an empty currentList array", async () => {
    mockFetch({ [MAX_URL]: json({ currentList: [] }) });

    const result = (await getMaxBattles())!;

    expect(result.maxBattleCount).toBe(0);
    expect([result.tier1, result.tier2, result.tier3, result.tier4, result.tier5, result.tier6]).toEqual(
      [[], [], [], [], [], []],
    );
  });

  it("returns null and reports once for a non-OK response with a JSON body [bug 1.9]", async () => {
    mockFetch({ [MAX_URL]: json({ currentList: {} }, { status: 500 }) });
    await expect(getMaxBattles()).resolves.toBeNull();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it("returns null and reports a network failure", async () => {
    mockFetch({ [MAX_URL]: new TypeError("fetch failed") });
    await expect(getMaxBattles()).resolves.toBeNull();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });
});
