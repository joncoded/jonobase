/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [    
    "./app/**/*.{ts,tsx}",    
    "./components/**/*.{ts,tsx}",    
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
        serif: ["Inria Serif", "serif"],
        sans: ["Barlow Condensed", "sans-serif"]        
      }
    },
  },
  safelist: [
    {
      pattern: /(bg|text|from|to)-+/,
      variants: [
        'dark', 'prose-a', 'dark:prose-a', 'hover', 'dark:hover', 'dark:hover:prose-a'
      ]
    },
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
};