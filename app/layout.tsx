import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Impact-First Product Evaluation Tool',
  description: 'Evaluate product proposals using Matt LeMay\'s Impact-First framework',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Impact-First Product Evaluation
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Based on Matt LeMay's Impact-First framework • Powered by Claude AI
                </p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  v2.0 AI
                </div>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
