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
        'our-story-dark-blue': 'var(--our-story-dark-blue)',
        'our-story-red': 'var(--our-story-red)',
        'our-story-yellow': 'var(--our-story-yellow)',
        'our-story-light-bg': 'var(--our-story-light-bg)',
        'our-story-darker-blue': 'var(--our-story-darker-blue)',
        'our-story-text-dark-gray': 'var(--our-story-text-dark-gray)',
        'our-story-text-medium-gray': 'var(--our-story-text-medium-gray)',
      },
    },
  },
  plugins: [],
}
export default config