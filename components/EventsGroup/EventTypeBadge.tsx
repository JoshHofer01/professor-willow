import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "../shadcn/badge";

export const eventTypeColorMap: Record<string, string> = {
  // general event categories
  "community-day": "bg-yellow-400",
  "research": "bg-indigo-500",
  "raid-day": "bg-red-600",
  "go-rocket-takeover": "bg-red-500",
  "event": "bg-blue-500",
  "timed-research": "bg-indigo-400",
  "raid-battles": "bg-rose-400",
  "team-go-rocket": "bg-green-500",
  "live-event": "bg-yellow-400",
  "limited-research": "bg-indigo-300",
  "raid-hour": "bg-red-300",
  "giovanni-special-research": "bg-rose-600",
  "pokemon-go-fest": "bg-orange-400",
  "research-breakthrough": "bg-indigo-600",
  "raid-weekend": "bg-rose-500",
  "global-challenge": "bg-emerald-500",
  "special-research": "bg-violet-500",
  "go-battle-league": "bg-sky-600",
  "safari-zone": "bg-amber-400",
  "research-day": "bg-indigo-200",
  "elite-raids": "bg-stone-700",
  "ticketed-event": "bg-purple-400",
  "max-battles": "bg-fuchsia-500",
  "location-specific": "bg-cyan-400",
  "max-mondays": "bg-fuchsia-300",
  "bonus-hour": "bg-lime-300",
  "pokemon-spotlight-hour": "bg-rose-300",
  "potential-ultra-unlock": "bg-amber-600",
  "update": "bg-gray-500",
  "season": "bg-indigo-700",
  "pokemon-go-tour": "bg-emerald-700",
  "go-pass": "bg-slate-600",
  "ticketed": "bg-violet-300",
  "pokestop-showcase": "bg-emerald-300",
  "wild-area": "bg-emerald-200",
  "city-safari": "bg-amber-300",
};

const EventTypeBadge = ({
  eventType,
  className,
}: {
  eventType: string;
  className?: string;
}) => {
  const color = eventTypeColorMap[eventType] ?? "bg-gray-400";
  return <Badge className={cn(`${color}`, className, "font-semibold text-black")}>{eventType}</Badge>;
};
export default EventTypeBadge;
