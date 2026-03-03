'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Github, Mail } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: Implement Supabase Auth
    console.log('Login with:', email)
    setTimeout(() => setLoading(false), 1000)
  }

  const handleOAuthLogin = (provider: 'google' | 'github') => {
    // TODO: Implement OAuth
    console.log('OAuth login:', provider)
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[#191919]">Welcome to ClawList</h1>
            <p className="text-[#666666]">Sign in to save favorites and submit skills</p>
          </div>

          <div className="space-y-4">
            {/* OAuth Buttons */}
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full py-3 px-4 border border-[#e5e5e5] rounded-2xl hover:border-[#191919] transition-colors flex items-center justify-center gap-2 text-[#191919]"
            >
              <Mail className="h-5 w-5" />
              Continue with Google
            </button>
            <button
              onClick={() => handleOAuthLogin('github')}
              className="w-full py-3 px-4 border border-[#e5e5e5] rounded-2xl hover:border-[#191919] transition-colors flex items-center justify-center gap-2 text-[#191919]"
            >
              <Github className="h-5 w-5" />
              Continue with GitHub
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e5e5e5]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-[#999999]">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#e5e5e5] rounded-2xl focus:outline-none focus:border-[#191919]"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#191919] text-white rounded-2xl hover:bg-[#262626] transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Magic Link'}
              </button>
            </form>

            <p className="text-xs text-center text-[#999999] mt-6">
              By continuing, you agree to our{' '}
              <Link href="/terms" className="text-[#191919] underline">Terms</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-[#191919] underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
