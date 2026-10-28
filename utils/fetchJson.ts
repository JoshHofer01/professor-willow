import * as Sentry from "@sentry/nextjs";

interface FetchJsonOptions {
  /** Name reported to Sentry, e.g. the calling function. */
  source: string;
  /** Seconds Next.js may cache the response for. */
  revalidate?: number;
}

/**
 * Fetches and parses JSON from an external API.
 *
 * Resolves to `null` on any failure (network error, non-OK status or an
 * unparsable body) and reports exactly one error to Sentry, so callers only
 * need to handle `null`.
 */
export async function fetchJson<T>(
  url: string,
  { source, revalidate }: FetchJsonOptions,
): Promise<T | null> {
  try {
    const response =
      revalidate === undefined
        ? await fetch(url)
        : await fetch(url, { next: { revalidate } });

    if (!response.ok) {
      throw new Error(`${url} responded with ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    Sentry.captureException(error, { extra: { source, url } });
    return null;
  }
}
