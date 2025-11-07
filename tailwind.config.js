/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        impact: {
          high: '#10b981',
          medium: '#f59e0b',
          low: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
