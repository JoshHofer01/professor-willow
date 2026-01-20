import { ShiniesProps } from "@/interfaces/interfaces";
import { weServTransformURL } from "@/utils/weServTransform";
import { LiveShiniesDisplay } from "../ClientComponents/LiveShiniesDisplay";

export const BoostedShinies = () => {
  const boostedShinies: ShiniesProps[] = [
    {
      dexNr: 926,
      name: "Fidough",
      image:
        weServTransformURL("https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm926.s.icon.png", "pokedexImage"),
      startDate: "January 20, 2026 10:00:00",
      endDate: "January 25, 2026 22:00:00",
    },
    {
      dexNr: 118,
      name: "Goldeen",
      image:
        weServTransformURL("https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm118.s.icon.png", "pokedexImage"),
      startDate: "January 20, 2026 10:00:00",
      endDate: "January 25, 2026 22:00:00",
    },
    {
      dexNr: 243,
      name: "Raikou",
      image:
        weServTransformURL("https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm243.s.icon.png", "pokedexImage"),
      startDate: "January 24, 2026 14:00:00",
      endDate: "January 24, 2026 17:00:00",
    },
    {
      dexNr: 37,
      name: "Vulpix",
      image:
        weServTransformURL("https://raw.githubusercontent.com/RetroJohn86/PoGo-Unpacked-DL-Assets/main/Sprite/pm%20and%20portraits/pm37.s.icon.png", "pokedexImage"),
      startDate: "February 1, 2026 14:00:00",
      endDate: "February 1, 2026 17:00:00",
    },
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <LiveShiniesDisplay boostedShinies={boostedShinies}/>
    </div>
  );
};