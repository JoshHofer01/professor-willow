// @vitest-environment node
import * as Sentry from "@sentry/nextjs";
import { describe, expect, it } from "vitest";
import { json, mockFetch } from "@/test/mockFetch";
import { fetchJson } from "./fetchJson";

const URL = "https://api.example.test/data.json";

describe("fetchJson", () => {
  it("returns the parsed body", async () => {
    mockFetch({ [URL]: json({ hello: "world" }) });
    await expect(fetchJson(URL, { source: "test" })).resolves.toEqual({ hello: "world" });
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it("passes revalidate through to Next's fetch cache", async () => {
    const stub = mockFetch({ [URL]: json({}) });
    await fetchJson(URL, { source: "test", revalidate: 600 });
    expect(stub).toHaveBeenCalledWith(URL, { next: { revalidate: 600 } });
  });

  it("doesn't pass cache options when revalidate isn't set", async () => {
    const stub = mockFetch({ [URL]: json({}) });
    await fetchJson(URL, { source: "test" });
    expect(stub).toHaveBeenCalledWith(URL);
  });

  it.each([
    ["a non-OK response", () => json({ error: true }, { status: 500 })],
    ["an unparsable body", () => new Response("<html>")],
    ["a network failure", () => new TypeError("fetch failed")],
  ])("returns null and reports one error for %s", async (_, response) => {
    mockFetch({ [URL]: response });

    await expect(fetchJson(URL, { source: "getThing" })).resolves.toBeNull();

    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
    expect(Sentry.captureException).toHaveBeenCalledWith(expect.any(Error), {
      extra: { source: "getThing", url: URL },
    });
  });
});
