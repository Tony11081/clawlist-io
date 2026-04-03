'use client'

import { useState } from 'react'

function getResourceInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

  return initials || name.slice(0, 2).toUpperCase()
}

export function EcosystemResourceLogo({
  logo,
  name,
}: {
  logo?: string
  name: string
}) {
  const [hasError, setHasError] = useState(false)

  if (!logo || hasError) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-sm font-black uppercase tracking-[0.18em] text-slate-700 dark:border-[#303030] dark:bg-[#121212] dark:text-slate-200">
        {getResourceInitials(name)}
      </div>
    )
  }

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2 dark:border-[#303030] dark:bg-[#121212]">
      {/* Third-party logos are remote assets, so a plain img keeps the directory resilient. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt={`${name} logo`}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  )
}

