/** @type {import('tailwindcss').Config} */

const variants = ['dark', 'hover', 'dark:hover', 'prose-a', 'dark:prose-a', 'prose-a:hover', 'dark:prose-a:hover' ]

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
    fontFamily: {      
      sans: ["Barlow Condensed", "sans-serif"],
      serif: ["Spectral", "serif"],
    },
    extend: {
    },
  },
  safelist: [    
    {
      pattern: /^(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants
    },    
    {
      pattern: /^(bg|text|border)-(white|black)$/,
      variants
    },
  ],

}