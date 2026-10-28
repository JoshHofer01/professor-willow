import type { MetadataRoute } from 'next'

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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map(({ path, priority }) => ({
    url: `${SITE}${path}`,
    lastModified,
    changeFrequency: 'daily',
    priority,
  }))
}
