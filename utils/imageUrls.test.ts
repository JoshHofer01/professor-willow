// @vitest-environment node
import { describe, expect, it } from "vitest";
import { getPkmnImgUrl } from "./getPkmnImgUrl";
import { weServTransformURL } from "./weServTransform";

const SPRITES = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

describe("getPkmnImgUrl", () => {
  it("builds the regular sprite URL", () => {
    expect(getPkmnImgUrl(25)).toBe(`${SPRITES}/25.png`);
  });

  it("builds the shiny sprite URL", () => {
    expect(getPkmnImgUrl(25, true)).toBe(`${SPRITES}/shiny/25.png`);
  });

  it("treats isShiny=false as regular", () => {
    expect(getPkmnImgUrl(25, false)).toBe(`${SPRITES}/25.png`);
  });
});

describe("weServTransformURL", () => {
  const source = "https://cdn.leekduck.com/assets/img/events/cd.jpg";

  it.each([
    ["dashboardImage", 800],
    ["eventDetailsImage", 1000],
    ["popoutImage", 600],
    ["eventCardImage", 350],
    ["pokedexImage", 100],
    ["pokemonDetailsImage", 180],
  ] as const)("sizes %s images to %i px wide", (type, width) => {
    const url = new URL(weServTransformURL(source, type));
    expect(url.origin).toBe("https://wsrv.nl");
    expect(url.searchParams.get("w")).toBe(String(width));
  });

  it("asks for WebP output", () => {
    const url = new URL(weServTransformURL(source, "pokedexImage"));
    expect(url.searchParams.get("output")).toBe("webp");
  });

  it("passes the source URL through", () => {
    const url = new URL(weServTransformURL(source, "pokedexImage"));
    expect(url.searchParams.get("url")).toBe(source);
  });

  it("encodes source URLs that contain query characters [bug 3.14]", () => {
    const withQuery = "https://example.test/img.png?size=large&v=2";
    const url = new URL(weServTransformURL(withQuery, "pokedexImage"));
    expect(url.searchParams.get("url")).toBe(withQuery);
    expect(url.searchParams.get("w")).toBe("100");
  });
});
