import { PokedexDisplay } from "@/components/PokemonGroup/PokedexDisplay";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pokedex | ProfessorWillow",
  description: "professorwillow.me - View pokedex of Pokemon available in Pokemon GO",
  keywords: [
    "pokemon go",
    "pokemon go pokedex",
    "pokedex",
    "professor willow",
  ],
  openGraph: {
    url: "https://professorwillow.me/pokemon",
    type: "website",
    title: "Pokedex | ProfessorWillow",
  },
};

const Pokemon = () => {
  return (
    <main className="container max-w-full p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Pokedex</h1>
        <p className="text-lg text-muted-foreground">
          Entire Pokedex of Pokemon currently available in Pokemon GO
        </p>
        <p className="text-sm text-muted-foreground">
          Use filters for a refined search, or navigate to more detailed stats
          by selecting a Pokemon.
        </p>
      </div>
      <PokedexDisplay />
    </main>
  );
};

export default Pokemon;
