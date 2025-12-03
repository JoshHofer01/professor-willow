
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { getPokemonByDexNr } from "@/utils/getPokemon";
import ErrorPage from "@/components/ErrorPage";
import { MovesDisplay, NextMonDisplay, PokemonDisplay, PrevMonDisplay, StatsDisplay, TypeBadgesDisplay } from "@/components/PokemonIdDisplays";

type Props = { params: Promise<{ pokemonId: string }> };

const PokemonDetails = async ({ params }: Props) => {
  const { pokemonId } = await params;
  const result = await getPokemonByDexNr(pokemonId);

  if (!result) {
    return;
  }

  const { pokemon } = result;

  if (pokemon == undefined) {
    return <ErrorPage message="asd" />;
  }

  return (
    <div className="container mx-auto p-4 justify-center flex">
      <Card className="py-4 max-w-[1000px]">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-4xl font-bold">
                {pokemon?.names?.English ?? pokemon?.id}
              </CardTitle>
              <CardDescription>
                Dex #: {pokemon?.dexNr} • Gen: {pokemon?.generation}
              </CardDescription>
            </div>
          </div>

          {pokemon.dexNr == 1025 ? null : <NextMonDisplay pokemon={pokemon} />}
          {pokemon.dexNr == 1 ? null : <PrevMonDisplay pokemon={pokemon} />}
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PokemonDisplay pokemon={pokemon} />
          <div className="md:col-span-2">

            {pokemon?.secondaryType ? (<TypeBadgesDisplay
              primary={pokemon?.primaryType}
              secondary={pokemon?.secondaryType}
            />) : (<TypeBadgesDisplay
              primary={pokemon?.primaryType}
            />)}

            <Separator className="my-4" />
            <StatsDisplay pokemon={pokemon} />
            <Separator className="my-4" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <MovesDisplay type="Quick Moves" moves={pokemon?.quickMoves} />
              <MovesDisplay
                type="Charged Moves"
                moves={pokemon?.cinematicMoves}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonDetails;
