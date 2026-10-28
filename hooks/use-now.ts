import { useMemo, useSyncExternalStore } from "react"

const MINUTE = 60_000

function subscribe(onMinute: () => void) {
  const interval = setInterval(onMinute, 1000)
  return () => clearInterval(interval)
}

// Snapshots are whole minutes, so React re-renders once a minute at most.
const getMinute = () => Math.floor(Date.now() / MINUTE)
const getServerMinute = () => null

/**
 * The current time to the minute, kept up to date.
 *
 * Returns `null` on the server and during hydration, so anything that
 * depends on the viewer's clock or time zone renders only in the browser.
 */
export function useNow(): Date | null {
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute)
  return useMemo(() => (minute === null ? null : new Date(minute * MINUTE)), [minute])
}
