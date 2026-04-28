'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'

interface FavoriteButtonProps {
  skillId: string
  initialFavorited?: boolean
  size?: 'default' | 'sm' | 'lg'
}

export function FavoriteButton({ skillId, initialFavorited = false, size = 'sm' }: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(initialFavorited)
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    setLoading(true)
    // TODO: Check if user is logged in
    // TODO: Call Supabase to toggle favorite
    setFavorited(!favorited)
    setTimeout(() => setLoading(false), 300)
  }

  return (
    <Button
      aria-label={`${favorited ? 'Remove' : 'Save'} ${skillId}`}
      variant={favorited ? 'default' : 'outline'}
      size={size}
      onClick={handleToggle}
      disabled={loading}
      className="gap-2"
    >
      <Heart
        className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`}
      />
      {favorited ? 'Saved' : 'Save'}
    </Button>
  )
}
