import type { MetadataRoute } from 'next'
import { guides, recipes, fallbackSkills } from '@/lib/catalog'

const baseUrl = 'https://clawlist.io'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/guides',
    '/skills',
    '/recipes',
    '/api-marketplace',
    '/models',
    '/security',
    '/terms',
    '/privacy',
  ]

  const now = new Date()

  const baseEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route || '/'}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))

  const guideEntries = guides.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const recipeEntries = recipes.map((recipe) => ({
    url: `${baseUrl}/recipes/${recipe.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const fallbackSkillEntries = fallbackSkills.map((skill) => ({
    url: `${baseUrl}/skills/${skill.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }))

  return [...baseEntries, ...guideEntries, ...recipeEntries, ...fallbackSkillEntries]
}
