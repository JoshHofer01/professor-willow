import { PokemonData, PokemonType } from "@/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getPokemonByDexNr } from "@/utils/getPokemon";
import ErrorPage from "@/components/ErrorPage";

const NextMonDisplay = async ({ pokemon }: { pokemon: PokemonData }) => {
  if (pokemon.dexNr == 1025) {
    return <div></div>;
  }

  const nextMonNumber = (pokemon.dexNr + 1).toString();
  const nextMonResult = await getPokemonByDexNr(nextMonNumber);

  if (!nextMonResult) {
    return <div></div>;
  }

  const { pokemon: nextMon } = nextMonResult;

  return (
    <div className="flex flex-row items-center gap-2">
      {pokemon?.evolutions?.length ? (
        <p className="text-xs">Evolves into:</p>
      ) : (
        <p className="text-xs">Next Pokemon:</p>
      )}
      <Link href={`/pokemon/${nextMon?.dexNr}`}>
        <div className="transition-transform duration-200 hover:scale-110">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage
                    src={nextMon?.assets.image}
                    alt={nextMon?.id}
                    className="object-scale-down"
                  />
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{nextMon?.names.English}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Link>
    </div>
  );
};

const PrevMonDisplay = async ({ pokemon }: { pokemon: PokemonData }) => {
  if (pokemon.dexNr == 0) {
    return <div></div>;
  }
  const prevMonNumber = (pokemon.dexNr - 1).toString();
  const prevMonResult = await getPokemonByDexNr(prevMonNumber);

  if (!prevMonResult) {
    return <div></div>;
  }

  const { pokemon: prevMon } = prevMonResult;

  return (
    <div className="flex flex-row items-center gap-2">
      <p className="text-xs">Previous Pokemon:</p>
      <Link href={`${prevMon?.dexNr}`}>
        <div className="transition-transform duration-200 hover:scale-110">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage
                    src={prevMon?.assets.image}
                    alt={prevMon?.id}
                    className="object-scale-down"
                  />
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{prevMon?.names.English}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Link>
    </div>
  );
};

type Props = { params: Promise<{ pokemonId: string }> };

const PokemonDetails = async ({ params }: Props) => {
  const { pokemonId } = await params;
  const result = await getPokemonByDexNr(pokemonId);

  if (!result) {
    return;
  }

  const { pokemon } = result;
  const typeColorMap: Record<string, string> = {
    Normal: "bg-gray-400",
    Fire: "bg-red-500",
    Water: "bg-blue-500",
    Grass: "bg-green-500",
    Electric: "bg-yellow-400",
    Ice: "bg-blue-200",
    Fighting: "bg-red-700",
    Poison: "bg-purple-500",
    Ground: "bg-yellow-600",
    Flying: "bg-indigo-300",
    Psychic: "bg-pink-500",
    Bug: "bg-lime-500",
    Rock: "bg-yellow-700",
    Ghost: "bg-purple-700",
    Dragon: "bg-indigo-700",
    Dark: "bg-gray-700",
    Steel: "bg-gray-500",
    Fairy: "bg-pink-300",
  };

  const getTypeBadge = (type: PokemonType) => {
    const color = typeColorMap[type.names.English] ?? "bg-gray-400";
    return (
      <Badge className={`${color} text-white`}>{type.names.English}</Badge>
    );
  };

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

          <NextMonDisplay pokemon={pokemon} />
          <PrevMonDisplay pokemon={pokemon} />
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 flex flex-row md:flex-col items-center justify-center space-y-4 mt-4 gap-x-4 gap-y-2">
            <Image
              src={pokemon?.assets?.image}
              alt={pokemon?.names?.English ?? pokemon?.id}
              width={256}
              height={256}
              className="max-w-44 max-h-44 object-scale-down"
            />

            {pokemon?.assets?.shinyImage && (
              <Image
                src={pokemon?.assets.shinyImage}
                alt={`Shiny ${pokemon?.names?.English ?? pokemon?.id}`}
                width={256}
                height={256}
                className="max-w-30 max-h-30 object-scale-down"
              />
            )}
          </div>
          <div className="md:col-span-2">
            <div className="flex flex-row gap-2">
              <h3 className="text-lg font-semibold p-1">Type:</h3>
              <div className="flex space-x-2 mt-2">
                {getTypeBadge(pokemon?.primaryType)}
                {pokemon?.secondaryType && getTypeBadge(pokemon?.secondaryType)}
              </div>
            </div>
            <Separator className="my-4" />
            <div>
              <h3 className="text-lg font-semibold">Stats</h3>
              <TooltipProvider>
                <div className="space-y-2 mt-2">
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div className="grid grid-cols-4 items-center">
                        <span className="font-medium">Stamina</span>
                        <Progress
                          value={Math.round(
                            (pokemon?.stats?.stamina / 420) * 100
                          )}
                          className={Math.round(
                            (pokemon?.stats?.stamina / 420) * 100
                          ) < 33 ? "bg-red-500" : Math.round(
                            (pokemon?.stats?.stamina / 420) * 100
                          ) > 66 ? "bg-green-500" : "bg-amber-500"}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{pokemon?.stats?.stamina}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div className="grid grid-cols-4 items-center">
                        <span className="font-medium">Attack</span>
                        <Progress
                          value={Math.round(
                            (pokemon?.stats?.attack / 360) * 100
                          )}
                          className={Math.round(
                            (pokemon?.stats?.attack / 360) * 100
                          ) < 33 ? "bg-red-500" : Math.round(
                            (pokemon?.stats?.attack / 360) * 100
                          ) > 66 ? "bg-green-500" : "bg-amber-500" }
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{pokemon?.stats?.attack}</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger className="w-full">
                      <div className="grid grid-cols-4 items-center">
                        <span className="font-medium">Defense</span>
                        <Progress
                          value={Math.round(
                            (pokemon?.stats?.defense / 350) * 100
                          )}
                          max={255}
                          className={Math.round(
                            (pokemon?.stats?.defense / 350) * 100
                          ) < 33 ? "bg-red-500" : Math.round(
                            (pokemon?.stats?.defense / 350) * 100
                          ) > 66 ? "bg-green-500" : "bg-amber-500"}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{pokemon?.stats?.defense}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold">Quick Moves</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {Object.values(pokemon?.quickMoves || {}).map((m) => (
                    <li key={m.id} className="flex justify-between">
                      <span>{m.names?.English ?? m.id}</span>
                      <span className="text-gray-500">
                        {m.type.names.English}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">Charged Moves</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {Object.values(pokemon?.cinematicMoves || {}).map((m) => (
                    <li key={m.id} className="flex justify-between">
                      <span>{m.names?.English ?? m.id}</span>
                      <span className="text-gray-500">
                        {m.type.names.English}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PokemonDetails;
