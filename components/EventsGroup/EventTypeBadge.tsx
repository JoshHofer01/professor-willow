import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "../shadcn/badge";
import { eventTypeColorMap } from "@/utils/maps";

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
