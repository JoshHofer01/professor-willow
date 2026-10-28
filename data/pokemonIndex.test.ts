// @vitest-environment node
import { describe, expect, it } from "vitest";
import pokemonIndex from "./pokemonIndex.json";

const TYPES = new Set([
  "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground",
  "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy",
]);

describe("pokemonIndex.json", () => {
  it("has entries", () => {
    expect(pokemonIndex.length).toBeGreaterThan(1000);
  });

  it("gives each entry a positive dex number, a name and a primary type", () => {
    for (const p of pokemonIndex) {
      expect(Number.isInteger(p.dexNr) && p.dexNr > 0, `dexNr of ${p.name}`).toBe(true);
      expect(p.name.length, `name of #${p.dexNr}`).toBeGreaterThan(0);
      expect(TYPES.has(p.primaryType), `primary type of ${p.name}`).toBe(true);
    }
  });

  it("only uses valid secondary types, or null", () => {
    for (const p of pokemonIndex) {
      if (p.secondaryType !== null) {
        expect(TYPES.has(p.secondaryType), `secondary type of ${p.name}`).toBe(true);
      }
    }
  });

  it("has unique dex numbers", () => {
    const dexNrs = pokemonIndex.map((p) => p.dexNr);
    expect(new Set(dexNrs).size).toBe(dexNrs.length);
  });

  it("is sorted by dex number", () => {
    const dexNrs = pokemonIndex.map((p) => p.dexNr);
    expect(dexNrs).toEqual([...dexNrs].sort((a, b) => a - b));
  });

  it("keeps generations within 1-9", () => {
    for (const p of pokemonIndex) {
      expect(p.generation, p.name).toBeGreaterThanOrEqual(1);
      expect(p.generation, p.name).toBeLessThanOrEqual(9);
    }
  });

  it("stores the API id of every entry, e.g. MR_MIME [bug 1.1]", () => {
    for (const p of pokemonIndex as Array<(typeof pokemonIndex)[number] & { id?: string }>) {
      expect(p.id, p.name).toMatch(/^[A-Z0-9_]+$/);
    }
    const mrMime = pokemonIndex.find((p) => p.dexNr === 122) as { id?: string } | undefined;
    expect(mrMime?.id).toBe("MR_MIME");
  });
});
