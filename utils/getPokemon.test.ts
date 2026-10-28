// @vitest-environment node
import * as Sentry from "@sentry/nextjs";
import { describe, expect, it } from "vitest";
import bulbasaur from "@/test/fixtures/pokemon-bulbasaur.json";
import mrMime from "@/test/fixtures/pokemon-mr_mime.json";
import { json, mockFetch } from "@/test/mockFetch";
import { getPkmnImgUrl } from "./getPkmnImgUrl";
import { getPokemonByName } from "./getPokemon";

const API = "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex";

describe("getPokemonByName", () => {
  it("requests the uppercased name endpoint", async () => {
    const stub = mockFetch({ [`${API}/name/BULBASAUR.json`]: json(bulbasaur) });
    await getPokemonByName("bulbasaur");
    expect(stub).toHaveBeenCalledWith(`${API}/name/BULBASAUR.json`);
  });

  it("resolves underscore ids such as mr_mime", async () => {
    mockFetch({ [`${API}/name/MR_MIME.json`]: json(mrMime) });
    const result = await getPokemonByName("mr_mime");
    expect(result?.pokemon.names.English).toBe("Mr. Mime");
  });

  it("rewrites assets to PokeAPI sprite URLs", async () => {
    mockFetch({ [`${API}/name/BULBASAUR.json`]: json(bulbasaur) });

    const result = await getPokemonByName("bulbasaur");

    expect(result?.pokemon.assets).toEqual({
      image: getPkmnImgUrl(1),
      shinyImage: getPkmnImgUrl(1, true),
    });
  });

  it("falls back to the question-mark image when the API has no assets", async () => {
    mockFetch({ [`${API}/name/BULBASAUR.json`]: json({ ...bulbasaur, assets: null }) });

    const result = await getPokemonByName("bulbasaur");

    expect(result?.pokemon.assets).toEqual({
      image: "/QuestionMark.png",
      shinyImage: "/QuestionMark.png",
    });
  });

  it("keeps the rest of the API data", async () => {
    mockFetch({ [`${API}/name/BULBASAUR.json`]: json(bulbasaur) });
    const result = await getPokemonByName("bulbasaur");
    expect(result?.pokemon).toMatchObject({ id: "BULBASAUR", dexNr: 1, stats: bulbasaur.stats });
  });

  it("returns null and reports a non-OK response", async () => {
    mockFetch({ [`${API}/name/NOPE.json`]: new Response("Not found", { status: 404 }) });
    await expect(getPokemonByName("nope")).resolves.toBeNull();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it("returns null and reports a network failure", async () => {
    mockFetch({ [`${API}/name/BULBASAUR.json`]: new TypeError("fetch failed") });
    await expect(getPokemonByName("bulbasaur")).resolves.toBeNull();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it.each(["mr. mime", "ho-oh", "farfetch'd", "../pokedex", "nidoran♀"])(
    "returns null for the invalid slug %j without fetching",
    async (slug) => {
      const stub = mockFetch({});
      await expect(getPokemonByName(slug)).resolves.toBeNull();
      expect(stub).not.toHaveBeenCalled();
    },
  );
});
