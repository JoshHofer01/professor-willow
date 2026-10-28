// @vitest-environment node
import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

const SITE = "https://professorwillow.me";
const NOT_PUBLIC = new Set(["/settings"]);

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

function sitemapPaths() {
  return sitemap().map((entry) => new URL(entry.url).pathname.replace(/\/$/, "") || "/");
}

describe("sitemap", () => {
  it("uses absolute URLs on the production domain", () => {
    for (const entry of sitemap()) expect(entry.url.startsWith(SITE)).toBe(true);
  });

  it("has no duplicate URLs", () => {
    const paths = sitemapPaths();
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("only lists routes that exist [bug 1.6]", () => {
    const routes = new Set(staticRoutes());
    for (const path of sitemapPaths()) expect(routes.has(path), path).toBe(true);
  });

  it("lists every static public route [bug 1.6]", () => {
    const paths = new Set(sitemapPaths());
    for (const route of staticRoutes()) expect(paths.has(route), route).toBe(true);
  });
});
