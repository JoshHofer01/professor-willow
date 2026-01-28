import { ShiniesProps } from "@/interfaces/interfaces";
import { weServTransformURL } from "@/utils/weServTransform";
import { LiveShiniesDisplay } from "../ClientComponents/LiveShiniesDisplay";

export const BoostedShinies = () => {
  const boostedShinies: ShiniesProps[] = [
    {
      dexNr: 50,
      name: "Diglett",
      image: weServTransformURL(
        "https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm50.s.icon.png",
        "pokedexImage",
      ),
      startDate: "January 27, 2026 10:00:00",
      endDate: "February 1, 2026 16:00:00",
    },
    {
      dexNr: 734,
      name: "Yungoos",
      image: weServTransformURL(
        "https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm734.s.icon.png",
        "pokedexImage",
      ),
      startDate: "January 27, 2026 10:00:00",
      endDate: "February 1, 2026 16:00:00",
    },
    {
      dexNr: 37,
      name: "Vulpix",
      image: weServTransformURL(
        "https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm37.s.icon.png",
        "pokedexImage",
      ),
      startDate: "February 1, 2026 14:00:00",
      endDate: "February 1, 2026 17:00:00",
    },
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <LiveShiniesDisplay boostedShinies={boostedShinies} />
    </div>
  );
};
