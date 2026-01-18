import {
  AssetForm,
  Move,
  PokemonData,
  PokemonType,
} from "@/interfaces/interfaces";
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
import { weServTransformURL } from "@/utils/weServTransform";
import PokemonPopout from "./PokemonPopout";
import { pokemonTypeColorMap } from "@/utils/colorMaps";

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
      <Link href={`/pokemon/${nextMon?.names.English}`}>
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
      <Link href={`${prevMon?.names.English}`}>
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
              <span className="font-medium">HP</span>
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
            src={weServTransformURL(
              pokemon.assets.image,
              "pokemonDetailsImage",
            )}
            alt={pokemon.names.English}
            width={300}
            height={300}
            className="max-w-40 max-h-40 object-scale-down"
            loading="eager"
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
              src={weServTransformURL(
                pokemon.assets.shinyImage,
                "pokemonDetailsImage",
              )}
              alt={`Shiny ${pokemon?.names?.English ?? pokemon?.id}`}
              width={300}
              height={300}
              className="max-w-40 max-h-40 object-scale-down"
              loading="eager"
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
  eliteMoves,
}: {
  type: string;
  moves: Record<string, Move>;
  eliteMoves: Record<string, Move>;
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
        {Object.values(eliteMoves || {}).map((em) => (
          <li key={em.id} className="flex justify-between">
            <span className="inline-flex gap-1">
              {em.names?.English ?? em.id}
              <p className="bg-linear-to-br from-purple-600 to-pink-400 px-1.5 rounded-xl">
                Elite
              </p>
            </span>
            <span className="text-gray-500">{em.type.names.English}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const PokemonTypeBadge = ({ type }:{type: string}) => {
    const color = pokemonTypeColorMap[type] ?? "bg-gray-400";
    return (
      <Badge className={`${color} text-white rounded-md`}>
        {type}
      </Badge>
    );
  };

export const TypeBadgesDisplay = ({
  primary,
  secondary,
}: {
  primary: PokemonType;
  secondary?: PokemonType;
}) => {
  return (
    <div className="flex flex-row gap-2">
      <h3 className="text-lg font-semibold p-1">Type:</h3>
      <div className="flex space-x-2 mt-2">
        <PokemonTypeBadge type={primary.names.English} />
        {secondary && <PokemonTypeBadge type={secondary.names.English} />}
      </div>
    </div>
  );
};

export const FormDisplay = ({
  name,
  assets,
  formType
}: {
  name: string;
  assets: AssetForm[];
  formType: string
}) => {
  const asset = assets.find((asset) => asset.form === formType);

  if (asset === undefined) return null;

  return (
    <PokemonPopout
      pokemonName={`${formType} ${name}`}
      regularImage={asset.image}
      shinyImage={asset.shinyImage}
    >
      <Image
        src={`/${formType}.png`}
        alt={`${formType} ${name}`}
        width={50}
        height={50}
      />
    </PokemonPopout>
  );
};

