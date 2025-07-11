const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d0d16', // fundo escuro (quase preto)
        card: '#1b1c22', // fundo de cards
        textPrimary: '#ffffff', // texto branco
        textSecondary: '#9ca3af', // cinza claro
        amber: {
          400: '#facc15', // dourado (semelhante ao da imagem)
          500: '#eab308', // um pouco mais escuro
        },
      },
      borderRadius: {
        xl: '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      boxShadow: {
        'card-glow': '0 0 30px rgba(250, 204, 21, 0.1)',
      },
    },
  },
  plugins: [],
};
