
/*
jonobase by @jonchius
/app/config.tsx
developer configuration 
stretch goal: try to make this updatable via backend?
*/

export const timezone = "America/Toronto"

// common tailwind colors (https://tailwindcss.com/docs/colors)
export const colors = {

  "link"
  : "text-sky-600",

  "darkLink"
  : "text-lime-300",

  "linkHover"
  : "text-black",

  "darkLinkHover"
  : "text-white"

}

// common tailwind styles
export const styling = {

  "button" : `p-2 px-5 border border-black dark:hover:border-white dark:border-white bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
  `, 

  "main-apex" : `bg-zinc-100 dark:bg-zinc-800
  `,

  "main-apex-first" : `text-lg md:text-2xl`,

  "main-apex-second" : `text-sm md:text-lg`,

  "home-head" : `bg-gradient-to-b drop-shadow-md 
    from-green-200 dark:from-green-900 to-green-300 dark:to-green-800 py-10 
  `,

  "home-head-main" : `
    w-3/4 md:w-full max-w-screen-lg mx-auto prose 
    prose-h2:text-4xl md:prose-h2:text-5xl prose-h2:mb-5 prose-h2:font-sans 
    prose-h3:text-3xl md:prose-h3:text-4xl prose-h3:mb-5 prose-h3:font-sans  
    prose-p:text-lg prose-p:font-serif prose-p:mb-5 prose-p:leading-relaxed
    text-black dark:text-white
  `,

  "post-head-sect" : `
    !bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 dark:text-white py-5
  `,

  "post-head-title" : `text-3xl md:text-5xl font-bold`,

  "post-head-subtitle" : `text-xl md:text-2xl mt-2`,

  "post-head-date" : `"text-sm md:text-lg mt-6"`,

  "post-main-sect" : `
    border-t dark:border-t-gray-600 
    prose-headings:font-sans prose-headings:font-bold prose-headings:mt-5 
    prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-xl 
    prose-code:text-white prose-code:bg-[#23241f] 
    prose-a:${colors.link} dark:prose-a:${colors.darkLink} 
    hover:prose-a:${colors.linkHover} dark:hover:prose-a:${colors.darkLinkHover} 
    hover:prose-a:underline font-serif
  `,

  "post-nook-sect" : `
    !bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-gray-800 dark:to-gray-900 
    text-sm lg:text-md py-5
  `,

  "post-nook-item" :`    
    focus:ring-offset-2 dark:focus:ring-4
  `,

  "post-xtra-sect" : `
    border-t hover:prose-a:underline 
    prose-a:${colors.link} dark:prose-a:${colors.darkLink} 
    hover:prose-a:${colors.linkHover} dark:hover:prose-a:${colors.darkLinkHover} 
    prose-headings:font-sans prose-headings:font-bold prose-headings:mt-5 
    prose-h2:text-4xl prose-h3:text-3xl prose-code:text-white prose-code:bg-[#23241f]
    font-serif
  `

}

// localization
export const text = {  

  "close menu"
  : "close menu", 

  "current page"
  : "current page", 
    
  "go to the home page" 
  : "go to the home page",

  "finds"
  : "finds", 

  "heaps"
  : "heaps", 

  "kinds"
  : "kinds", 
  
  "loading"
  : "loading",
  
  "loading message"
  : "page is loading shortly ... thanks for your patience!",

  "menu"
  : "Menu", 

  "newer"
  : "newer",

  "nooks"         
  : "nooks",

  "nooks explained"
  : "think of 'nooks' as 'topic tags'",

  "older"
  : "older",

  "page"
  : "page",

  "page number"
  : "page number", 

  "page not found" 
  : "page not found",

  "post newer"
  : "newer post",

  "post older"
  : "older post", 

  "posts"
  : "posts", 

  "result"
  : "result",

  "results"       
  : "results",

  "result for query"     
  : "result for query", 
  
  "results for query"     
  : "results for query", 
  
  "result for kind"  
  : "result for kind", 

  "results for kind"  
  : "results for kind", 
  
  "results found none"     
  : "no result(s) found", 

  "search"        
  : "find",

  "search go"
  : "go", 

  "see more posts"
  : "see more posts", 

  "sides"
  : "sides", 

  "skip to main content" 
  : "skip to main content", 

  "switch to dark mode"
  : "switch to dark mode",

  "switch to light mode"
  : "switch to light mode",

  "updated"
  : "updated", 

  "visit url"     
  : "visit URL",

  "wikis"
  : "wikis", 

  "zines"
  : "zines", 
  
}