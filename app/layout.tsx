import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Impact Calculator - Product Proposal Evaluator',
  description: 'Evaluate product proposals using the Impact-First framework. Instant scoring and AI-powered insights.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 font-sans antialiased" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white tracking-tight">Impact Calculator</h1>
                  <p className="text-xs text-slate-400">Product Proposal Evaluator</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-xs font-semibold text-blue-300">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  AI Powered
                </span>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
