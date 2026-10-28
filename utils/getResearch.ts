import { Research } from "@/interfaces/interfaces";
import { fetchJson } from "./fetchJson";

export async function getResearch() {
  const research = await fetchJson<Research[]>(
    "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/research.json",
    { source: "getResearch", revalidate: 600 },
  );
  if (!research) return null;

  return { research };
}
