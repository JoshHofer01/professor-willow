import { ShiniesProps } from "@/interfaces/interfaces";
import { weServTransformURL } from "@/utils/weServTransform";
import { LiveShiniesDisplay } from "../ClientComponents/LiveShiniesDisplay";

export const BoostedShinies = () => {
  const boostedShinies: ShiniesProps[] = [
    {
      dexNr: 522,
      name: "Blitzle",
      image: weServTransformURL(
        "https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm522.s.icon.png",
        "pokedexImage",
      ),
      startDate: "February 17, 2026 10:00:00",
      endDate: "February 21, 2026 20:00:00",
    },
    {
      dexNr: 554,
      name: "Darumaka",
      image: weServTransformURL(
        "https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm554.s.icon.png",
        "pokedexImage",
      ),
      startDate: "February 17, 2026 10:00:00",
      endDate: "February 21, 2026 20:00:00",
    },
    {
      dexNr: 999,
      name: "Gimmighoul",
      image: weServTransformURL(
        "https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm999.s.icon.png",
        "pokedexImage",
      ),
      startDate: "February 17, 2026 10:00:00",
      endDate: "February 21, 2026 20:00:00",
    },
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <LiveShiniesDisplay boostedShinies={boostedShinies} />
    </div>
  );
};
