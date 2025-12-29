import { Move, PokemonData, PokemonType } from "@/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/shadcn/badge";
import { Progress } from "@/components/shadcn/progress";
import { Avatar, AvatarImage } from "@/components/shadcn/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";
import { getPokemonByDexNr } from "@/utils/getPokemon";
import ErrorPage from "@/components/ErrorPage";

export const NextMonDisplay = async ({ pokemon }: { pokemon: PokemonData }) => {
  const nextMonNumber = (pokemon.dexNr + 1).toString();
  const nextMonResult = await getPokemonByDexNr(nextMonNumber);

  if (!nextMonResult) {
    return (
      <ErrorPage
        message={`Error finding pokemon following ${pokemon.names.English}`}
      />
    );
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
          <>
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
          </>
        </div>
      </Link>
    </div>
  );
};

export const PrevMonDisplay = async ({ pokemon }: { pokemon: PokemonData }) => {
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
        </div>
      </Link>
    </div>
  );
};

export const StatsDisplay = ({ pokemon }: { pokemon: PokemonData }) => {
  function getStatusColor(statValue: number, statTotal: number) {
    return Math.round((statValue / statTotal) * 100) < 33
      ? "bg-red-500"
      : Math.round((statValue / statTotal) * 100) > 66
      ? "bg-green-500"
      : "bg-amber-500";
  }

  return (
    <div>
      <h3 className="text-lg font-semibold">Stats</h3>
      <div className="space-y-2 mt-2">
        <Tooltip>
          <TooltipTrigger className="w-full">
            <div className="grid grid-cols-4 items-center">
              <span className="font-medium">Stamina</span>
              <Progress
                value={Math.round((pokemon?.stats?.stamina / 420) * 100)}
                className={getStatusColor(pokemon?.stats?.stamina, 420)}
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
                value={Math.round((pokemon?.stats?.attack / 360) * 100)}
                className={getStatusColor(pokemon?.stats?.attack, 360)}
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
                value={Math.round((pokemon?.stats?.defense / 350) * 100)}
                max={255}
                className={getStatusColor(pokemon?.stats?.defense, 350)}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{pokemon?.stats?.defense}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export const PokemonDisplay = ({ pokemon }: { pokemon: PokemonData }) => {
  return (
    <div className="md:col-span-1 flex flex-row md:flex-col items-center justify-center space-y-4 mt-4 gap-x-4 gap-y-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            src={pokemon?.assets.image}
            alt={pokemon.names.English}
            width={500}
            height={500}
            className="max-w-40 max-h-40 object-scale-down"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Regular {pokemon.names.English}</p>
        </TooltipContent>
      </Tooltip>

      {pokemon?.assets?.shinyImage && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Image
              src={pokemon?.assets.shinyImage}
              alt={`Shiny ${pokemon?.names?.English ?? pokemon?.id}`}
              width={500}
              height={500}
              className="max-w-40 max-h-40 object-scale-down"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Shiny {pokemon.names.English}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export const MovesDisplay = ({
  type,
  moves,
}: {
  type: string;
  moves: Record<string, Move>;
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">{type}</h3>
      <ul className="mt-2 space-y-1 text-sm">
        {Object.values(moves || {}).map((m) => (
          <li key={m.id} className="flex justify-between">
            <span>{m.names?.English ?? m.id}</span>
            <span className="text-gray-500">{m.type.names.English}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const TypeBadgesDisplay = ({
  primary,
  secondary,
}: {
  primary: PokemonType;
  secondary?: PokemonType;
}) => {
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
  return (
    <div className="flex flex-row gap-2">
      <h3 className="text-lg font-semibold p-1">Type:</h3>
      <div className="flex space-x-2 mt-2">
        {getTypeBadge(primary)}
        {secondary && getTypeBadge(secondary)}
      </div>
    </div>
  );
};
