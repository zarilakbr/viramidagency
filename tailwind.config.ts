import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F0F0F',
        surface: '#171717',
        'surface-hover': '#222222',
        border: '#282828',
        'border-hover': '#F97316',
        orange: '#F97316',
        'orange-hover': '#EA580C',
        cyan: '#22D3C5',
        purple: '#C26FE0',
        foreground: '#F4F3FF',
        muted: '#A1A1AA',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['monospace'],
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
} satisfies Config;
