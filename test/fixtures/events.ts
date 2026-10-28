import type { GameEvent } from "@/interfaces/interfaces";

/** Fixed "now" used across event tests: 28 Oct 2026, 12:00 UTC. */
export const NOW = new Date("2026-10-28T12:00:00.000Z");

let counter = 0;

/**
 * Builds a ScrapedDuck-shaped event. Dates default to a live event.
 * ScrapedDuck sends offset-less local times for most events and `Z` times
 * for global ones; both shapes are used in the tests.
 */
export function makeEvent(overrides: Partial<Record<keyof GameEvent, unknown>> = {}) {
  counter += 1;
  return {
    eventID: `event-${counter}`,
    name: `Event ${counter}`,
    eventType: "event",
    heading: "Event",
    link: `https://leekduck.com/events/event-${counter}/`,
    image: `https://cdn.leekduck.com/assets/img/events/event-${counter}.jpg`,
    start: "2026-10-27T10:00:00.000",
    end: "2026-10-29T20:00:00.000",
    ...overrides,
  } as GameEvent;
}
