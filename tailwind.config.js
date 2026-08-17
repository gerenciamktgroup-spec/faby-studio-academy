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
        faby: {
          pink: '#DD006B',         // Institutional Pink / Signature Editorial
          'deep-pink': '#B70055',  // Deep Magenta Accent
          blush: '#F6CADB',        // Soft Luxury Rose / Highlight Surface
          powder: '#FBE8EF',       // Delicate Powder Rose
          ivory: '#FAF6F3',        // Warm Editorial Base
          white: '#FFFDFC',        // Pure Canvas White
          noir: '#111114',         // Editorial Charcoal Black
          obsidian: '#09090B',     // Deep Obsidian Black
          cocoa: '#725244',        // Warm Cocoa Earth
          nude: '#B98A70',         // Editorial Nude
          champagne: '#C5A47C',    // Muted Champagne Gold
          border: '#E8E2DA',       // Soft Luxury Divider Border
          subtext: '#6E6763',      // Warm Editorial Body Grey
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
