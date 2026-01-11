
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
    "dexNr": 341,
    "name": "Corphish",
    "image": "https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm341.s.icon.png"
  },
  {
    "dexNr": 557,
    "name": "Dwebble",
    "image": "https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm557.s.icon.png"
  },
  {
    "dexNr": 692,
    "name": "Clauncher",
    "image": "https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm692.s.icon.png"
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
                href={`/pokemon/${pokemon.dexNr}`}
                className="flex items-center justify-center w-full h-full"
              >
                {pokemon.image ? (
                  <Image
                    src={weServTransformURL(pokemon.image, "pokedexImage")}
                    alt={pokemon.name}
                    width={64}
                    height={64}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <Image
                    src="/QuestionMark.png"
                    alt="Question Mark"
                    width={64}
                    height={64}
                    className="max-w-full max-h-full object-contain"
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
