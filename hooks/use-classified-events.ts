import { GameEvent } from "@/interfaces/interfaces"
import { classifyEvents } from "@/utils/classifyEvents"
import { useMemo } from "react"
import { useNow } from "./use-now"

/**
 * Events split into live/upcoming/completed using the viewer's clock and
 * time zone. `null` until the component has mounted in the browser.
 */
export function useClassifiedEvents(events: GameEvent[]) {
  const now = useNow()
  return useMemo(() => (now ? classifyEvents(events, now) : null), [events, now])
}
