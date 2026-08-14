/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fabi: {
          pink: '#E11D48',       // Rose 600 - Luxury Magenta/Pink
          darkpink: '#BE185D',   // Pink 700
          lightpink: '#FFF1F2',  // Rose 50
          rose: '#FDF2F8',       // Pink 50
          gold: '#B45309',       // Amber/Gold 700 for light theme
          charcoal: '#F8FAFC',   // Slate 50 - Base background
          card: '#FFFFFF',       // Pure White Card Surface
          border: '#E2E8F0',     // Slate 200 - Clean subtle border
          cream: '#FFFFFF',      // Pure White
          subtext: '#64748B',    // Slate 500 - Secondary text
          dark: '#0F172A',       // Slate 900 - High contrast text
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
