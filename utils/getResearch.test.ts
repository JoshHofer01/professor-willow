// @vitest-environment node
import * as Sentry from "@sentry/nextjs";
import { describe, expect, it } from "vitest";
import researchFixture from "@/test/fixtures/research.json";
import { json, mockFetch } from "@/test/mockFetch";
import { getResearch } from "./getResearch";

const RESEARCH_URL =
  "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/research.json";

describe("getResearch", () => {
  it("returns research tasks with their rewards", async () => {
    mockFetch({ [RESEARCH_URL]: json(researchFixture) });

    const result = await getResearch();

    expect(result?.research).toHaveLength(researchFixture.length);
    expect(result?.research[0].rewards).toEqual(researchFixture[0].rewards);
  });

  it("strips the <span> markup ScrapedDuck wraps task text in [bug 1.14]", async () => {
    mockFetch({ [RESEARCH_URL]: json(researchFixture) });

    const result = await getResearch();

    expect(result?.research.map((t) => t.text)).toEqual(
      researchFixture.map((t) => t.text.replace(/<\/?span>/g, "")),
    );
    expect(result?.research.some((t) => t.text.includes("<"))).toBe(false);
  });

  it("returns null and reports a non-OK response", async () => {
    mockFetch({ [RESEARCH_URL]: new Response("nope", { status: 500 }) });
    await expect(getResearch()).resolves.toBeNull();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it("returns null (not undefined) and reports a network failure", async () => {
    mockFetch({ [RESEARCH_URL]: new TypeError("fetch failed") });
    await expect(getResearch()).resolves.toBeNull();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });
});
