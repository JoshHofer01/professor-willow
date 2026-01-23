import PageContainer from "@/components/PageContainer";
import { PokedexDisplay } from "@/components/PokemonGroup/PokedexDisplay";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Pokedex | ProfessorWillow",
  description:
    "professorwillow.me - View pokedex of Pokemon available in Pokemon GO",
  keywords: ["pokemon go", "pokemon go pokedex", "pokedex", "professor willow"],
  openGraph: {
    url: "https://professorwillow.me/pokemon",
    type: "website",
    title: "Pokedex | ProfessorWillow",
  },
};

const Pokemon = () => {
  return (
    <PageContainer
      title="Pokedex"
      description="Entire Pokedex of Pokemon currently available in Pokemon GO"
    >
      <p className="text-xs text-muted-foreground mb-2">
        Use filters for a refined search, or navigate to more detailed stats by
        selecting a Pokemon.
      </p>
      <Suspense>
        {/*  Suspense wraps useSearchParams() in PokedexDisplay */}
        <PokedexDisplay />
      </Suspense>
    </PageContainer>
  );
};

export default Pokemon;
