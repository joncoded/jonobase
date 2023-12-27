/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1440px"
    },
    extend: {
      fontFamily: {
        serif: ["Nunito", "serif"],
        sans: ["Barlow Condensed", "sans-serif"]        
      }
    },
  },
  safelist: [
    {
      pattern: /(bg|text)-+/,
      variants: [
        'dark', 'prose-a', 'hover', 'hover:dark', 'hover:dark:prose-a'
      ]
    },
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
};