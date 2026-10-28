import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import { Separator } from "@/components/shadcn/separator";
import { getPokemonByName } from "@/utils/getPokemon";
import {
  FormDisplay,
  MovesDisplay,
  NextMonDisplay,
  PokemonDisplay,
  PrevMonDisplay,
  StatsDisplay,
  TypeBadgesDisplay,
} from "@/components/PokemonGroup/PokemonIdDisplays";
import { pokemonHref } from "@/utils/pokedex";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ pokemonName: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pokemonName } = await params;
  const result = await getPokemonByName(pokemonName);

  if (!result) {
    return {
      title: "Not Found | ProfessorWillow",
      description: "Pokemon not found",
    };
  }

  const name = result.pokemon.names.English;

  return {
    title: `${name} | ProfessorWillow`,
    description: `Learn about ${name} in Pokemon GO!`,
    keywords: [
      "pokemon go",
      "pokedex",
      name,
      "pokemon go pokedex",
      "professor willow",
    ],
    openGraph: {
      title: `${name} | ProfessorWillow`,
      description: `Learn about ${name} in Pokemon GO!`,
      type: "website",
      url: `https://professorwillow.me${pokemonHref(pokemonName)}`,
    },
  };
}

const PokemonDetails = async ({ params }: Props) => {
  const { pokemonName } = await params;
  const result = await getPokemonByName(pokemonName);

  if (!result) {
    notFound();
  }

  const { pokemon } = result;

  const eliteQuickMovesRecord = Array.isArray(pokemon.eliteQuickMoves)
    ? {}
    : pokemon.eliteQuickMoves;
  const eliteCinematicMovesRecord = Array.isArray(pokemon.eliteCinematicMoves)
    ? {}
    : pokemon.eliteCinematicMoves;

  return (
    <div className="container mx-auto p-4 justify-center flex">
      <Card className="py-4 max-w-250">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-4xl font-bold">
                {pokemon.names.English ?? pokemon?.id}
              </CardTitle>
              <CardDescription>
                Dex #: {pokemon?.dexNr} • Gen: {pokemon?.generation}
              </CardDescription>
            </div>
          </div>

          <NextMonDisplay pokemon={pokemon} />
          <PrevMonDisplay pokemon={pokemon} />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <PokemonDisplay pokemon={pokemon} />
            <div className="flex flex-row justify-center md:mt-6">
              <FormDisplay
                name={pokemon.names.English}
                assets={pokemon.assetForms}
                formType="GIGANTAMAX"
              />
              <FormDisplay
                name={pokemon.names.English}
                assets={pokemon.assetForms}
                formType="MEGA"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            {pokemon?.secondaryType ? (
              <TypeBadgesDisplay
                primary={pokemon?.primaryType}
                secondary={pokemon?.secondaryType}
              />
            ) : (
              <TypeBadgesDisplay primary={pokemon?.primaryType} />
            )}

            <Separator className="my-4" />
            <StatsDisplay pokemon={pokemon} />
            <Separator className="my-4" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MovesDisplay
                type="Quick Moves"
                moves={pokemon?.quickMoves}
                eliteMoves={eliteQuickMovesRecord}
              />
              <MovesDisplay
                type="Charged Moves"
                moves={pokemon?.cinematicMoves}
                eliteMoves={eliteCinematicMovesRecord}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonDetails;
