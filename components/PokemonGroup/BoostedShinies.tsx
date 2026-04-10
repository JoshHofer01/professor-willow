import { ShiniesProps } from "@/interfaces/interfaces";
import { weServTransformURL } from "@/utils/weServTransform";
import { LiveShiniesDisplay } from "../ClientComponents/LiveShiniesDisplay";
import { getPkmnImgUrl } from "@/utils/getPkmnImgUrl";

export const BoostedShinies = () => {
  const boostedShinies: ShiniesProps[] = [
    {
      dexNr: 522,
      name: "Blitzle",
      image: weServTransformURL(
        getPkmnImgUrl(522, true),
        "pokedexImage",
      ),
      startDate: "February 17, 2026 10:00:00",
      endDate: "February 21, 2026 20:00:00",
    },
  {
    dexNr: 957,
    name: "Tinkatink",
    image: weServTransformURL(
      getPkmnImgUrl(957, true),
      "pokedexImage"),
    startDate: "April 11, 2026 14:00:00",
    endDate: "April 11, 2026 17:00:00",
  }
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <LiveShiniesDisplay boostedShinies={boostedShinies} />
    </div>
  );
};
