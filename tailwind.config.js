/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/screens/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        foreground: '#EAEAEA',
        muted: {
          DEFAULT: '#9CA3AF',
          foreground: '#6B7280',
        },
        border: '#1F2937',
        input: '#1F2937',
        ring: '#4ADE80',
        primary: {
          DEFAULT: '#4ADE80',
          foreground: '#0D0D0D',
        },
        secondary: {
          DEFAULT: '#1F2937',
          foreground: '#EAEAEA',
        },
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FECACA',
        },
        accent: {
          DEFAULT: '#374151',
          foreground: '#EAEAEA',
        },
      },
    },
  },
  plugins: [],
};


