import { GameEvent } from "@/interfaces/interfaces";
import { getBoostedShinies } from "@/utils/boostedShinies";
import { LiveShiniesDisplay } from "../ClientComponents/LiveShiniesDisplay";

export const BoostedShinies = ({ events }: { events: GameEvent[] }) => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <LiveShiniesDisplay boostedShinies={getBoostedShinies(events)} />
    </div>
  );
};
