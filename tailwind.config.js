/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/screens/**/*.{js,ts,jsx,tsx}',
    './src/styles/**/*.{js,ts,jsx,tsx}', // se você tiver componentes com classe aqui
  ],
  theme: {
    extend: {
      colors: {
        background: '#0D0D0D',
        foreground: '#EAEAEA',
        muted: '#9CA3AF',
        border: '#1F2937',
        primary: '#4ADE80',
      },
    }

  },
  plugins: [],
};


