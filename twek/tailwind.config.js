/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'itc-gothic': ['ITC Avant Garde Gothic Pro', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: '#241331',
        secondary: '#C3AF6C',
      }
    },
  },
  plugins: [],
}
