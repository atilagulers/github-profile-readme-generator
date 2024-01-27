import type {Config, theme} from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#FFC107',
          DEFAULT: '#FFC107',
          dark: '#FFD700',
        },
        secondary: {
          light: '#FFC107',
          DEFAULT: '#FFC107',
          dark: '#FFD700',
        },
        light: {
          DEFAULT: '#F8F9FA',
        },
        dark: {
          light: '#343a40',
          DEFAULT: '#212529',
          dark: '#131515',
        },
      },
    },
  },
  plugins: [],
};
export default config;
