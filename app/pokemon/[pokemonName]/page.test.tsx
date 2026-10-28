import { describe, expect, it } from "vitest";
import mrMime from "@/test/fixtures/pokemon-mr_mime.json";
import { json, mockFetch } from "@/test/mockFetch";
import { NotFoundError } from "@/test/mocks/navigation";
import PokemonDetails, { generateMetadata } from "./page";

const API = "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/name";
const params = (pokemonName: string) => ({ params: Promise.resolve({ pokemonName }) });

describe("/pokemon/[pokemonName]", () => {
  it("renders a known Pokémon", async () => {
    mockFetch({ [`${API}/MR_MIME.json`]: json(mrMime) });
    await expect(PokemonDetails(params("mr_mime"))).resolves.toBeTruthy();
  });

  it("returns a 404 for an unknown Pokémon [bug 1.1]", async () => {
    mockFetch({ [`${API}/MISSINGNO.json`]: new Response("Not found", { status: 404 }) });
    await expect(PokemonDetails(params("missingno"))).rejects.toBeInstanceOf(NotFoundError);
  });

  it("titles unknown Pokémon as not found", async () => {
    mockFetch({ [`${API}/MISSINGNO.json`]: new Response("Not found", { status: 404 }) });
    const metadata = await generateMetadata(params("missingno"));
    expect(metadata.title).toBe("Not Found | ProfessorWillow");
  });

  it("titles the page with the Pokémon's display name [bug 1.1]", async () => {
    mockFetch({ [`${API}/MR_MIME.json`]: json(mrMime) });
    const metadata = await generateMetadata(params("mr_mime"));
    expect(metadata.title).toBe("Mr. Mime | ProfessorWillow");
  });

  it("uses the lowercase slug as the canonical Open Graph URL", async () => {
    mockFetch({ [`${API}/MR_MIME.json`]: json(mrMime) });
    const metadata = await generateMetadata(params("MR_MIME"));
    expect(metadata.openGraph?.url).toBe("https://professorwillow.me/pokemon/mr_mime");
  });
});
