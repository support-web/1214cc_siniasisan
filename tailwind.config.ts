import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        'primary-light': '#4CAF50',
        accent: '#FF9800',
        background: '#FAFAFA',
        text: '#333333',
        'line-green': '#06C755',
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'Yu Gothic', 'sans-serif'],
      },
      fontSize: {
        'body': '18px',
        'heading': '24px',
        'title': '28px',
      },
      lineHeight: {
        'relaxed': '1.8',
        'loose': '2.0',
      },
    },
  },
  plugins: [],
}
export default config
