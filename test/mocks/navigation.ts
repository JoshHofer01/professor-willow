import { vi } from "vitest";

export class NotFoundError extends Error {
  constructor() {
    super("NEXT_NOT_FOUND");
  }
}

export const router = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  refresh: vi.fn(),
  prefetch: vi.fn(),
};

let searchParams = new URLSearchParams();

/** Sets the query string returned by `useSearchParams()`. */
export function setSearchParams(params: Record<string, string> | string) {
  searchParams = new URLSearchParams(params);
}

export function resetNavigation() {
  searchParams = new URLSearchParams();
}

export const navigationMock = {
  useRouter: () => router,
  useSearchParams: () => searchParams,
  usePathname: () => "/",
  notFound: () => {
    throw new NotFoundError();
  },
};
