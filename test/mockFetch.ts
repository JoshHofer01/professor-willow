import { vi } from "vitest";

type MockResponse = Response | Error | (() => Response | Error);

/** JSON response helper. */
export function json(body: unknown, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

/**
 * Replaces `fetch` with a stub that answers the given URLs.
 * An `Error` value rejects like a network failure. Unknown URLs throw.
 * Returns the stub so tests can assert on calls.
 */
export function mockFetch(routes: Record<string, MockResponse>) {
  const stub = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input instanceof Request ? input.url : input);
    if (!(url in routes)) throw new Error(`Unmocked fetch: ${url}`);
    const route = routes[url];
    const result = typeof route === "function" ? route() : route;
    if (result instanceof Error) throw result;
    return result.clone();
  });
  vi.stubGlobal("fetch", stub);
  return stub;
}
