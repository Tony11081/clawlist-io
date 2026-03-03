import 'server-only'

import { createHash } from 'crypto'

export function getClientIp(forwardedFor: string | null) {
  if (!forwardedFor) {
    return undefined
  }

  return forwardedFor
    .split(',')
    .map((entry) => entry.trim())
    .find(Boolean)
}

export function hashIpAddress(ipAddress?: string | null) {
  if (!ipAddress) {
    return undefined
  }

  return createHash('sha256').update(ipAddress).digest('hex')
}
