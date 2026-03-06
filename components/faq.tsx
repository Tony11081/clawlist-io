'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  title?: string
  description?: string
}

export function FAQ({ items, title = 'Frequently Asked Questions', description }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto py-16 px-8 lg:px-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          {description && (
            <p className="text-slate-500 dark:text-slate-400">{description}</p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#262626]/40 border border-slate-200 dark:border-[#262626] rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-[#262626]/60 transition-colors"
            >
              <span className="font-bold text-lg pr-4">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
