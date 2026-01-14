import { weServTransformURL } from "@/utils/weServTransform";
import Image from "next/image";
import Link from "next/link";

interface ShiniesProps {
  dexNr: number;
  name: string;
  image: string;
}
export const BoostedShinies = () => {
  //? REMEMBER: Update the 'Updated on' date on dashboard card
  const boostedPokemon: ShiniesProps[] = [
      {
    "dexNr": 938,
    "name": "Tadbulb",
    "image": "https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm938.s.icon.png"
  }
  ];

  return (
    <>
      {boostedPokemon.length ? (
        <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {boostedPokemon.map((pokemon) => (
            <div
              key={pokemon.dexNr}
              className="bg-muted rounded flex items-center justify-center p-1"
            >
              <Link
                href={`/pokemon/${pokemon.name}`}
                className="flex items-center justify-center w-full h-full"
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
