import {
  AssetForm,
  Move,
  PokemonData,
  PokemonDataMin,
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
import { getPkmnImgUrl } from "@/utils/getPkmnImgUrl";
import { weServTransformURL } from "@/utils/weServTransform";
import { pokemonTypeColorMap } from "@/utils/maps";
import { pokedex, pokemonHref } from "@/utils/pokedex";

const NeighbourLink = ({
  label,
  neighbour,
}: {
  label: string;
  neighbour: PokemonDataMin;
}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <p className="text-xs">{label}</p>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={pokemonHref(neighbour.id)}
            aria-label={neighbour.name}
            className="transition-transform duration-200 hover:scale-110"
          >
            <Avatar>
              <AvatarImage
                src={getPkmnImgUrl(neighbour.dexNr)}
                alt=""
                className="object-scale-down"
              />
            </Avatar>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{neighbour.name}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

// Neighbours come from the local index, so gaps in the API (e.g. #902) are skipped.
export const NextMonDisplay = ({ pokemon }: { pokemon: PokemonData }) => {
  const next = pokedex.find((entry) => entry.dexNr > pokemon.dexNr);
  if (!next) return null;

  const isEvolution = pokemon.evolutions?.some((evo) => evo.id === next.id);

  return (
    <NeighbourLink
      label={isEvolution ? "Evolves into:" : "Next Pokemon:"}
      neighbour={next}
    />
  );
};

export const PrevMonDisplay = ({ pokemon }: { pokemon: PokemonData }) => {
  const previous = pokedex.findLast((entry) => entry.dexNr < pokemon.dexNr);
  if (!previous) return null;

  return <NeighbourLink label="Previous Pokemon:" neighbour={previous} />;
};

export const StatsDisplay = ({ pokemon }: { pokemon: PokemonData }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold">Stats</h3>
      <div className="space-y-2 mt-2">
        {STATS.map(({ label, key, scale }) => (
          <StatRow
            key={key}
            label={label}
            value={pokemon?.stats?.[key]}
            scale={scale}
          />
        ))}
      </div>
    </div>
  );
};

// Bars are drawn against these values; a few Pokémon exceed them.
const STATS = [
  { label: "HP", key: "stamina", scale: 420 },
  { label: "Attack", key: "attack", scale: 360 },
  { label: "Defense", key: "defense", scale: 350 },
] as const;

const StatRow = ({
  label,
  value,
  scale,
}: {
  label: string;
  value: number;
  scale: number;
}) => {
  // Clamped so outliers (e.g. Blissey's HP) fill the bar rather than shift it.
  const percent = Math.min(100, Math.round((value / scale) * 100));
  const color =
    percent < 33 ? "bg-red-500" : percent > 66 ? "bg-green-500" : "bg-amber-500";

  return (
    <Tooltip>
      <TooltipTrigger className="w-full">
        <div className="grid grid-cols-4 items-center">
          <span className="font-medium">{label}</span>
          <Progress value={percent} aria-label={label} className={color} />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{value}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export const PokemonDisplay = ({ pokemon }: { pokemon: PokemonData }) => {
  return (
    <div className="md:col-span-1 flex flex-row md:flex-col items-center justify-center space-y-4 mt-4 gap-x-4 gap-y-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Image
            src={
              pokemon.assets.image == "/QuestionMark.png"
                ? pokemon.assets.image
                : weServTransformURL(
                    pokemon.assets.image,
                    "pokemonDetailsImage",
                  )
            }
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
              src={
                pokemon.assets.image == "/QuestionMark.png"
                  ? pokemon.assets.image
                  : weServTransformURL(
                      pokemon.assets.shinyImage,
                      "pokemonDetailsImage",
                    )
              }
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

export const PokemonTypeBadge = ({ type }: { type: string }) => {
  const color = pokemonTypeColorMap[type] ?? "bg-gray-400";
  return <Badge className={`${color} text-white rounded-md`}>{type}</Badge>;
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
  formType,
}: {
  name: string;
  assets: AssetForm[];
  formType: string;
}) => {
  const asset = assets.find((asset) => asset.form === formType);

  if (asset === undefined) return null;

  return (
    <Image
      src={`/${formType}.png`}
      alt={`${formType} ${name}`}
      title={`HAS ${formType}`} // Remove when original assets are fixed
      width={50}
      height={50}
    />
  );
};

//! Return value for FormDisplay once original assets are fixed
{
  /* <PokemonPopout
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
    </PokemonPopout> */
}
