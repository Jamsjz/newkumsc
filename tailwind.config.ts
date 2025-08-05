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
        'footer-bg': '#2f3033',
        'footer-text': '#6b8891',
        'footer-accent': '#ff8c42',
        'footer-border': '#454850',
      },
    },
  },
  plugins: [],
}
export default config
