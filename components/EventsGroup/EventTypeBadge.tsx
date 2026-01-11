import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "../shadcn/badge";

export const eventTypeColorMap: Record<string, string> = {
  "bonus-hour": "bg-lime-300",
  "city-safari": "bg-amber-300",
  "community-day": "bg-yellow-300",
  "elite-raids": "bg-stone-400",
  "event": "bg-sky-400",
  "giovanni-special-research": "bg-rose-400",
  "go-battle-league": "bg-sky-400",
  "go-pass": "bg-slate-400",
  "go-rocket-takeover": "bg-rose-400",
  "global-challenge": "bg-emerald-400",
  "limited-research": "bg-indigo-300",
  "live-event": "bg-amber-300",
  "location-specific": "bg-cyan-300",
  "max-battles": "bg-fuchsia-400",
  "max-mondays": "bg-fuchsia-300",
  "pokemon-go-fest": "bg-orange-300",
  "pokemon-go-tour": "bg-emerald-400",
  "pokemon-spotlight-hour": "bg-rose-300",
  "pokestop-showcase": "bg-emerald-300",
  "potential-ultra-unlock": "bg-amber-400",
  "raid-battles": "bg-rose-300",
  "raid-day": "bg-red-200",
  "raid-hour": "bg-red-400",
  "raid-weekend": "bg-pink-400",
  "research": "bg-indigo-400",
  "research-breakthrough": "bg-indigo-400",
  "research-day": "bg-indigo-200",
  "safari-zone": "bg-amber-300",
  "season": "bg-indigo-400",
  "special-research": "bg-violet-300",
  "team-go-rocket": "bg-emerald-400",
  "ticketed": "bg-violet-300",
  "ticketed-event": "bg-purple-300",
  "timed-research": "bg-indigo-300",
  "update": "bg-gray-300",
  "wild-area": "bg-emerald-200",
};
const EventTypeBadge = ({
  eventType,
  eventHeading,
  className,
}: {
  eventType: string;
  eventHeading?: string;
  className?: string;
}) => {
  const color = eventTypeColorMap[eventType] ?? "bg-gray-400";
  return (
    <Badge
      className={cn(`${color}`, className, "font-semibold text-black w-full")}
    >
      {eventHeading ? eventHeading : eventType}
    </Badge>
  );
};
export default EventTypeBadge;
