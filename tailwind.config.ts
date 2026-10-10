import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0A0A2E',
        surface: '#12123F',
        'surface-hover': '#1A1A52',
        border: '#262660',
        'border-hover': '#F97316',
        orange: {
          DEFAULT: '#F97316',
          500: '#F97316',
          400: '#FDBA4D',
          hover: '#FDBA4D',
        },
        navy: {
          DEFAULT: '#0A0A2E',
          950: '#070722',
          900: '#0A0A2E',
          800: '#12123F',
          700: '#262660',
        },
        cream: '#F4F3FF',
        foreground: '#F4F3FF',
        muted: '#9A9BC7',
        error: '#FF6B6B',
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['monospace'],
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        section: '120px',
        'section-mobile': '72px',
      },
    },
  },
  plugins: [],
} satisfies Config;
