import { weServTransformURL } from "@/utils/weServTransform";
import Image from "next/image";
import Link from "next/link";

interface ShiniesProps {
  dexNr: number;
  name: string;
  image: string;
}

//TODO: Add Date() object to each pokemon for start/end date
// Add logic in BoostedShinies to only show shinies boosted between start/end date
export const BoostedShinies = () => {
  //? REMEMBER: Update the 'Updated on' date on "app\page.tsx"
  const boostedPokemon: ShiniesProps[] = [
  ];

  return (
    <>
      {boostedPokemon.length ? (
        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {boostedPokemon.map((pokemon) => (
            <div
              key={pokemon.dexNr}
              className="bg-muted flex items-center justify-center p-1"
            >
              <Link
                href={`/pokemon/${pokemon.name}`}
                className="flex items-center justify-center h-full"
              >
                {pokemon.image ? (
                  <div>
                    <Image
                      src={weServTransformURL(pokemon.image, "pokedexImage")}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                      className="object-scale-down max-h-18 max-w-18"
                    />
                  </div>
                ) : (
                  <Image
                    src="/QuestionMark.png"
                    alt="Question Mark"
                    width={64}
                    height={64}
                    className=""
                  />
                )}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-32 bg-linear-to-br from-foreground/20 to-background/20 rounded-lg">
          <span className="text-lg px-1 font-semibold">No Boosted Shinies</span>
        </div>
      )}
    </>
  );
};
