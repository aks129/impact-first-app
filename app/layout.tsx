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
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Impact-First Product Evaluation
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Based on Matt LeMay's Impact-First framework
            </p>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
