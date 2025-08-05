import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'footer-bg': 'var(--footer-bg)',
        'footer-text': 'var(--footer-text)',
        'footer-accent': 'var(--footer-accent)',
        'footer-border': 'var(--footer-border)',
        'header-text': 'var(--header-text)',
        'header-text-hover': 'var(--header-text-hover)',
      },
    },
  },
  plugins: [],
}
export default config