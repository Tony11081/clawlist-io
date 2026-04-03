const AD_SUPPRESSED_PREFIXES = [
  '/apps',
  '/api-marketplace',
  '/models',
  '/recipes',
  '/directory',
]

function normalizePathname(pathname?: string | null) {
  if (!pathname || pathname === '/') {
    return pathname ?? '/'
  }

  return pathname.replace(/\/+$/, '')
}

export function isAdSuppressedPath(pathname?: string | null) {
  const normalizedPathname = normalizePathname(pathname)

  return AD_SUPPRESSED_PREFIXES.some((prefix) =>
    normalizedPathname === prefix || normalizedPathname.startsWith(`${prefix}/`)
  )
}

