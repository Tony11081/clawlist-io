'use client'

import { useMemo, useState } from 'react'
import { Check, Copy, Facebook, Linkedin, Share2, Twitter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SocialShareButtonsProps {
  title: string
  url: string
  className?: string
}

export function SocialShareButtons({
  title,
  url,
  className,
}: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = useMemo(() => {
    const encodedTitle = encodeURIComponent(title)
    const encodedUrl = encodeURIComponent(url)

    return [
      {
        label: 'Share on X',
        href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        icon: Twitter,
      },
      {
        label: 'Share on LinkedIn',
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        icon: Linkedin,
      },
      {
        label: 'Share on Facebook',
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        icon: Facebook,
      },
    ]
  }, [title, url])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy share link:', error)
    }
  }

  return (
    <section
      className={cn(
        'mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212]',
        className,
      )}
      aria-label="Share this page"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            <Share2 className="h-4 w-4" />
            Share
          </p>
          <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
            Send this page to someone who needs it
          </h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {shareLinks.map(({ label, href, icon: Icon }) => (
            <Button key={label} asChild size="sm" variant="outline">
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
                {label.replace('Share on ', '')}
              </a>
            </Button>
          ))}

          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Link
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
