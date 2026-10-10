import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#04344C',
        surface: '#074563',
        'surface-hover': '#0B567C',
        border: '#165A7E',
        'border-hover': '#B0EDF9',
        // Exclusive Dual-Tone Palette: #04344C and #B0EDF9
        brand: {
          DEFAULT: '#B0EDF9',
          light: '#B0EDF9',
          dark: '#04344C',
          hover: '#C8F4FC',
        },
        cyan: {
          DEFAULT: '#B0EDF9',
          500: '#B0EDF9',
          400: '#B0EDF9',
          hover: '#C8F4FC',
        },
        orange: {
          DEFAULT: '#B0EDF9',
          500: '#B0EDF9',
          400: '#B0EDF9',
          hover: '#C8F4FC',
        },
        navy: {
          DEFAULT: '#04344C',
          950: '#022131',
          900: '#04344C',
          800: '#074563',
          700: '#165A7E',
          600: '#23739C',
        },
        teal: {
          DEFAULT: '#04344C',
          900: '#04344C',
          800: '#074563',
          700: '#165A7E',
        },
        cream: '#B0EDF9',
        foreground: '#B0EDF9',
        muted: '#78B9CA',
        error: '#B0EDF9',
      },
      fontFamily: {
        heading: ['Gastilo', 'Space Grotesk', 'sans-serif'],
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
