import type { MetadataRoute } from 'next'
import { getEvents } from '@/utils/getEvents'

const SITE = 'https://professorwillow.me'

const routes: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/events', priority: 0.8 },
  { path: '/events/upcoming', priority: 0.7 },
  { path: '/events/live', priority: 0.7 },
  { path: '/events/completed', priority: 0.7 },
  { path: '/raids', priority: 0.7 },
  { path: '/battles', priority: 0.7 },
  { path: '/research', priority: 0.7 },
  { path: '/pokemon', priority: 0.7 },
  { path: '/legal', priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()
  const events = await getEvents()

  return [
    ...routes.map(({ path, priority }) => ({
      url: `${SITE}${path}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority,
    })),
    // Event pages; an events outage just leaves them out.
    ...events.map((event) => ({
      url: `${SITE}/events/${encodeURIComponent(event.eventID)}`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.5,
    })),
  ]
}
