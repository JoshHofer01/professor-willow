import { PokemonDataMin } from "@/interfaces/interfaces";
import Image from "next/image";
import Link from "next/link";

interface ShiniesProps {
  dexNr: number;
  name: string;
  image: string;
}
export const BoostedShinies = () => {
  const boostedShinies: ShiniesProps[] = [
    {
      dexNr: 246,
      name: "Larvitar",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm246.s.icon.png",
    },
    {
      dexNr: 371,
      name: "Bagon",
      image:
        "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/Addressable%20Assets/pm371.s.icon.png",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {boostedShinies.map((pokemon) => (
        <div
          key={pokemon.dexNr}
          className="aspect-square bg-muted rounded flex items-center justify-center p-1"
        >
          <Link
            href={`/pokemon/${pokemon.dexNr}`}
            className="flex items-center justify-center w-full h-full"
          >
            {pokemon.image ? (
              <Image
                src={pokemon.image}
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
  );
};
