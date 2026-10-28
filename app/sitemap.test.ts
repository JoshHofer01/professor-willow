// @vitest-environment node
import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { beforeEach, describe, expect, it } from "vitest";
import { makeEvent } from "@/test/fixtures/events";
import { json, mockFetch } from "@/test/mockFetch";
import sitemap from "./sitemap";

const SITE = "https://professorwillow.me";
const NOT_PUBLIC = new Set(["/settings"]);
const EVENTS_URL =
  "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.json";
const EVENT_PAGE = /^\/events\/[^/]+$/;

/** Static routes from app/**\/page.tsx, with route groups removed. */
function staticRoutes() {
  const appDir = join(process.cwd(), "app");
  const files = readdirSync(appDir, { recursive: true, encoding: "utf8" }).filter(
    (f) => f.endsWith(`${sep}page.tsx`) || f === "page.tsx",
  );
  return files
    .map((file) =>
      relative(appDir, join(appDir, file))
        .split(sep)
        .slice(0, -1)
        .filter((segment) => !/^\(.*\)$/.test(segment)),
    )
    .filter((segments) => !segments.some((s) => s.startsWith("[")))
    .map((segments) => `/${segments.join("/")}`)
    .filter((route) => !NOT_PUBLIC.has(route));
}

async function sitemapPaths() {
  return (await sitemap()).map((entry) => new URL(entry.url).pathname.replace(/\/$/, "") || "/");
}

describe("sitemap", () => {
  beforeEach(() => {
    mockFetch({
      [EVENTS_URL]: json([
        makeEvent({ eventID: "pawniard-community-day" }),
        makeEvent({ eventID: "halloween-2026" }),
      ]),
    });
  });

  it("uses absolute URLs on the production domain", async () => {
    for (const entry of await sitemap()) expect(entry.url.startsWith(SITE)).toBe(true);
  });

  it("has no duplicate URLs", async () => {
    const paths = await sitemapPaths();
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("only lists routes that exist", async () => {
    const routes = new Set(staticRoutes());
    for (const path of await sitemapPaths()) {
      expect(routes.has(path) || EVENT_PAGE.test(path), path).toBe(true);
    }
  });

  it("lists every static public route", async () => {
    const paths = new Set(await sitemapPaths());
    for (const route of staticRoutes()) expect(paths.has(route), route).toBe(true);
  });

  it("lists a page for each event", async () => {
    const paths = await sitemapPaths();
    expect(paths).toContain("/events/pawniard-community-day");
    expect(paths).toContain("/events/halloween-2026");
  });

  it("still lists the static routes when the events feed is down", async () => {
    mockFetch({ [EVENTS_URL]: new TypeError("fetch failed") });
    const paths = await sitemapPaths();
    expect([...paths].sort()).toEqual(staticRoutes().sort());
  });
});
