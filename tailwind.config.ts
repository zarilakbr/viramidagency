import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A2E',
        surface: '#12123F',
        'surface-hover': '#181850',
        border: '#262660',
        'border-hover': '#F97316',
        orange: '#F97316',
        'orange-hover': '#EA580C',
        cyan: '#22D3C5',
        purple: '#C26FE0',
        foreground: '#F4F3FF',
        muted: '#9A9BC7',
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
