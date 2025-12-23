
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
  ];

  return (
    <>
      {boostedPokemon.length ? (
        <div className="grid grid-cols-4 gap-2">
          {boostedPokemon.map((pokemon) => (
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
      ) : (
        <div className="flex items-center justify-center h-32 bg-linear-to-br from-foreground/20 to-background/20 rounded-lg">
          <span className="text-lg px-1 font-semibold">No Boosted Shinies</span>
        </div>
      )}
    </>
  );
};
