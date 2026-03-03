import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit (Preview)',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children
}
