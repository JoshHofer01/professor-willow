import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

import { Separator } from "@/components/shadcn/separator";
import { getPokemonByName } from "@/utils/getPokemon";
import ErrorPage from "@/components/ErrorPage";
import {
  FormDisplay,
  MovesDisplay,
  NextMonDisplay,
  PokemonDisplay,
  PrevMonDisplay,
  StatsDisplay,
  TypeBadgesDisplay,
} from "@/components/PokemonGroup/PokemonIdDisplays";
import { Metadata } from "next";

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

  return {
    title: `${pokemonName} | ProfessorWillow`,
    description: `Learn about ${pokemonName} in Pokemon GO!`,
    keywords: [
      "pokemon go",
      "pokedex",
      pokemonName,
      "pokemon go pokedex",
      "professor willow",
    ],
    openGraph: {
      title: `${pokemonName} | ProfessorWillow`,
      description: `Learn about ${pokemonName} in Pokemon GO!`,
      type: "website",
      url: `https://professorwillow.me/pokemon/${pokemonName}`,
    },
  };
}

const PokemonDetails = async ({ params }: Props) => {
  const { pokemonName } = await params;
  const result = await getPokemonByName(pokemonName);

  if (!result) {
    return;
  }

  const { pokemon } = result;

  if (pokemon == undefined) {
    return <ErrorPage />;
  }

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

          {pokemon.dexNr == 1025 ? null : <NextMonDisplay pokemon={pokemon} />}
          {pokemon.dexNr == 1 ? null : <PrevMonDisplay pokemon={pokemon} />}
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
