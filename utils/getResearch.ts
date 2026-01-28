import { Research } from "@/interfaces/interfaces";
import * as Sentry from "@sentry/nextjs";

export async function getResearch() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/research.json",
      { next: { revalidate: 600 } },
    );

    if (!response.ok) {
        return null;
    }

    const research: Research[] = await response.json();

    return { research };

  } catch (error) {
    Sentry.captureException(error, {
      extra: { source: "getResearch" },
    });
  }
}
