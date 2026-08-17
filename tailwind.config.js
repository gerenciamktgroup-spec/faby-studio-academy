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
          pink: '#DD006B',       // Institutional Pink / Editorial Lipstick
          darkpink: '#960046',   // Deep Berry
          lightpink: '#FFF1F5',  // Very soft rose tint
          ivory: '#F8F5F1',      // Warm Ivory
          white: '#FFFFFF',      // Pure Editorial White
          obsidian: '#0A0A0D',   // Deep Obsidian Noir
          noir: '#111117',       // Editorial Deep Noir
          champagne: '#C5A880',  // Muted Champagne Gold
          border: '#E8E4DF',     // Subtle Ivory Border
          subtext: '#6E6B68',    // Warm Editorial Grey
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Manrope', 'Inter', 'sans-serif'],
        editorial: ['var(--font-editorial)', '"Bodoni Moda"', 'serif'],
        display: ['var(--font-editorial)', '"Bodoni Moda"', 'serif'],
      },
    },
  },
  plugins: [],
};
