import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";

// Testing Library only advances fake timers it recognises as Jest's. Without
// this, its async utilities wait forever on a faked setTimeout(0).
Object.assign(globalThis, {
  jest: { advanceTimersByTime: (ms: number) => vi.advanceTimersByTime(ms) },
});

vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
  captureMessage: vi.fn(),
}));

vi.mock("next/navigation", async () => {
  const { navigationMock } = await import("./mocks/navigation");
  return navigationMock;
});

beforeEach(() => {
  // No test may reach the network: anything not mocked with mockFetch throws.
  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL) => {
      throw new Error(`Unmocked fetch: ${String(input)}`);
    }),
  );
});

afterEach(async () => {
  if (typeof document !== "undefined") cleanup();
  vi.useRealTimers();
  vi.clearAllMocks();
  const { resetNavigation } = await import("./mocks/navigation");
  resetNavigation();
});

// jsdom gaps that Radix, cmdk and embla rely on.
if (typeof window !== "undefined") {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  class IntersectionObserverStub {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }

  window.ResizeObserver ??= ResizeObserverStub;
  window.IntersectionObserver ??=
    IntersectionObserverStub as unknown as typeof IntersectionObserver;
  window.matchMedia ??= (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
  Element.prototype.scrollIntoView ??= () => {};
  Element.prototype.hasPointerCapture ??= () => false;
  Element.prototype.releasePointerCapture ??= () => {};
  Element.prototype.setPointerCapture ??= () => {};
}
