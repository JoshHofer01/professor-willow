"use client";

import { useNow } from "@/hooks/use-now";
import { GameEvent } from "@/interfaces/interfaces";
import AddToCalendar from "./AddToCalendar";
import { Skeleton } from "../shadcn/skeleton";

/**
 * A date formatted in the viewer's locale and time zone. Renders a
 * placeholder on the server, where neither is known.
 */
export function LocalDateTime({ value }: { value: string | null }) {
  const now = useNow();

  if (!value) return <>TBA</>;
  if (!now) return <Skeleton className="inline-block h-4 w-36 align-middle" />;
  return <time dateTime={value}>{new Date(value).toLocaleString()}</time>;
}

/** Add to Calendar, shown only while the event hasn't started for the viewer. */
export function UpcomingAddToCalendar({ event }: { event: GameEvent }) {
  const now = useNow();

  if (!now || !event.start || now >= new Date(event.start)) return null;
  return <AddToCalendar eventDetails={event} />;
}
