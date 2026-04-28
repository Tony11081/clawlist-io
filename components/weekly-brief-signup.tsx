'use client'

import type { FormEvent } from 'react'
import { useMemo, useState, useTransition } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react'

import { sendAnalyticsEvent } from '@/lib/analytics/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type WeeklyBriefSignupProps = {
  pagePath: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function WeeklyBriefSignup({ pagePath }: WeeklyBriefSignupProps) {
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isPending, startTransition] = useTransition()

  const fallbackHref = useMemo(() => {
    const nextEmail = email.trim()
    const subject = encodeURIComponent(
      'Subscribe me to the Autonomous Agent Weekly',
    )
    const body = encodeURIComponent(
      nextEmail
        ? `Please add ${nextEmail} to the Autonomous Agent Weekly.`
        : 'Please add me to the Autonomous Agent Weekly.',
    )

    return `mailto:hello@clawlist.io?subject=${subject}&body=${body}`
  }, [email])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedEmail = email.trim().toLowerCase()

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setStatus('error')
      setMessage('Enter a valid email address so we can send the brief.')
      return
    }

    startTransition(async () => {
      try {
        const response = await fetch('/api/weekly-brief/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            company,
            email: normalizedEmail,
            pagePath,
            source: 'homepage_agent_weekly',
          }),
        })

        const payload = await response.json().catch(() => ({}))

        if (!response.ok) {
          throw new Error(
            typeof payload.error === 'string'
              ? payload.error
              : 'We could not save your signup yet.',
          )
        }

        setEmail('')
        setCompany('')
        setStatus('success')
        setMessage(
          payload.alreadySubscribed
            ? 'You are already on the list. We will keep sending the agent brief there.'
            : 'You are in. Expect the next Autonomous Agent Weekly in your inbox.',
        )

        void sendAnalyticsEvent({
          eventType: 'cta_click',
          pagePath,
          metadata: {
            cta: 'autonomous_agent_weekly_signup',
            placement: 'homepage',
            source: 'homepage_agent_weekly',
          },
        })
      } catch (error) {
        setStatus('error')
        setMessage(
          error instanceof Error
            ? error.message
            : 'We could not save your signup yet.',
        )
      }
    })
  }

  return (
    <section
      id="weekly-brief"
      className="mb-14 grid gap-6 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm dark:border-[#262626] dark:bg-[#121212] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:p-8"
    >
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500">
          Autonomous Agent Weekly
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100 lg:text-4xl">
          Keep one high-signal email between you and the noise.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
          Get one editorial digest with the OpenClaw, Claude Code, Codex, and
          workflow moves that changed how teams are using autonomous agents.
        </p>
        <div className="mt-6 grid gap-3 text-sm leading-6 text-slate-600 dark:text-slate-400 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-[#191919]">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              Original signal
            </p>
            <p className="mt-2">
              One editor-picked digest instead of another launch dump.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-[#191919]">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              Operator focus
            </p>
            <p className="mt-2">
              Practical workflows, not just funding rounds and feature lists.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-[#191919]">
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              Low frequency
            </p>
            <p className="mt-2">
              One weekly send. No daily drip. No inbox spam.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 dark:border-[#303030] dark:bg-[#191919]">
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">
            <Mail className="h-5 w-5" />
          </div>
          Join the list
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Work email
            </span>
            <Input
              autoComplete="email"
              className="h-12 rounded-2xl border-slate-200 bg-white text-base dark:border-[#303030] dark:bg-[#121212]"
              name="email"
              placeholder="you@company.com"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label className="hidden" aria-hidden="true">
            Company
            <Input
              autoComplete="off"
              name="company"
              tabIndex={-1}
              value={company}
              onChange={(event) => setCompany(event.target.value)}
            />
          </label>

          <Button
            className="h-12 w-full rounded-2xl bg-slate-900 text-sm font-bold uppercase tracking-[0.18em] text-white hover:opacity-90 dark:bg-slate-100 dark:text-slate-900"
            disabled={isPending}
            type="submit"
          >
            {isPending ? 'Saving...' : 'Get the agent brief'}
            {!isPending && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>

        <Link
          href="/briefs"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 underline underline-offset-4 dark:text-slate-100"
        >
          Read the public archive
          <ArrowRight className="h-4 w-4" />
        </Link>

        <p className="mt-4 text-xs leading-6 text-slate-500">
          By subscribing, you agree to receive the Autonomous Agent Weekly. You
          can reply to any issue to unsubscribe.
        </p>

        {message && (
          <div
            className={`mt-4 rounded-2xl border px-4 py-3 text-sm leading-6 ${
              status === 'success'
                ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-200'
                : 'border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p>{message}</p>
                {status === 'error' && (
                  <a
                    className="mt-2 inline-flex items-center gap-2 font-semibold underline underline-offset-4"
                    href={fallbackHref}
                  >
                    Subscribe by email instead
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
