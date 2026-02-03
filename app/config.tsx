
/*
jonobase by @joncoded (aka @jonchius)
/app/config.tsx
developer configuration
stretch goal: try to make this updatable via backend?
*/

export const timezone = "America/Toronto"

// generate dynamic colors based on the colorScheme from database
export const getColors = (colorScheme: string = 'green') => {
  
  // map color scheme to tailwind color classes
  const colorMap: Record<string, { link: string, darkLink: string, linkHover: string, darkLinkHover: string }> = {
    'red': { link: 'text-red-700', darkLink: 'text-red-300', linkHover: 'text-black', darkLinkHover: 'text-white' },
    'yellow': { link: 'text-yellow-700', darkLink: 'text-yellow-300', linkHover: 'text-black', darkLinkHover: 'text-white' },
    'orange': { link: 'text-orange-700', darkLink: 'text-orange-300', linkHover: 'text-black', darkLinkHover: 'text-white' },
    'green': { link: 'text-green-700', darkLink: 'text-green-300', linkHover: 'text-black', darkLinkHover: 'text-white' },
    'sky': { link: 'text-sky-700', darkLink: 'text-sky-300', linkHover: 'text-black', darkLinkHover: 'text-white' },
    'blue': { link: 'text-blue-700', darkLink: 'text-blue-300', linkHover: 'text-black', darkLinkHover: 'text-white' },
    'purple': { link: 'text-purple-700', darkLink: 'text-purple-300', linkHover: 'text-black', darkLinkHover: 'text-white' },
    'pink': { link: 'text-pink-700', darkLink: 'text-pink-300', linkHover: 'text-black', darkLinkHover: 'text-white' },
    'gray': { link: 'text-gray-700', darkLink: 'text-gray-300', linkHover: 'text-black', darkLinkHover: 'text-white' },
  }
  
  return colorMap[colorScheme] || colorMap['green']

}

// common tailwind styles - now a function that accepts colorScheme
export const getStyling = (colorScheme: string = 'green') => {
  const colors = getColors(colorScheme)
  
  // map full class names for Tailwind JIT compilation
  const buttonColorMap: Record<string, string> = {
    'red': 'bg-red-800! hover:bg-red-600! border-red-800! hover:border-red-600!',
    'yellow': 'bg-yellow-800! hover:bg-yellow-600! border-yellow-800! hover:border-yellow-600!',
    'orange': 'bg-orange-800! hover:bg-orange-600! border-orange-800! hover:border-orange-600!',
    'green': 'bg-green-800! hover:bg-green-600! border-green-800! hover:border-green-600!',
    'sky': 'bg-sky-800! hover:bg-sky-600! border-sky-800! hover:border-sky-600!',
    'blue': 'bg-blue-800! hover:bg-blue-600! border-blue-800! hover:border-blue-600!',
    'purple': 'bg-purple-800! hover:bg-purple-600! border-purple-800! hover:border-purple-600!',
    'pink': 'bg-pink-800! hover:bg-pink-600! border-pink-800! hover:border-pink-600!',
    'gray': 'bg-gray-800! hover:bg-gray-600! border-gray-800! hover:border-gray-600!',
  }

  const homeHeadColorMap: Record<string, string> = {
    'red': 'from-red-200 dark:from-red-900 to-red-300 dark:to-red-800',
    'yellow': 'from-yellow-200 dark:from-yellow-900 to-yellow-300 dark:to-yellow-800',
    'orange': 'from-orange-200 dark:from-orange-900 to-orange-300 dark:to-orange-800',
    'green': 'from-green-200 dark:from-green-900 to-green-300 dark:to-green-800',
    'sky': 'from-sky-200 dark:from-sky-900 to-sky-300 dark:to-sky-800',
    'blue': 'from-blue-200 dark:from-blue-900 to-blue-300 dark:to-blue-800',
    'purple': 'from-purple-200 dark:from-purple-900 to-purple-300 dark:to-purple-800',
    'pink': 'from-pink-200 dark:from-pink-900 to-pink-300 dark:to-pink-800',
    'gray': 'from-gray-200 dark:from-gray-900 to-gray-300 dark:to-gray-800',
  }

  const proseColorMap: Record<string, string> = {
    'red': 'prose-a:text-red-700! dark:prose-a:text-red-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'yellow': 'prose-a:text-yellow-700! dark:prose-a:text-yellow-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'orange': 'prose-a:text-orange-700! dark:prose-a:text-orange-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'green': 'prose-a:text-green-700! dark:prose-a:text-green-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'sky': 'prose-a:text-sky-700! dark:prose-a:text-sky-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'blue': 'prose-a:text-blue-700! dark:prose-a:text-blue-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'purple': 'prose-a:text-purple-700! dark:prose-a:text-purple-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'pink': 'prose-a:text-pink-700! dark:prose-a:text-pink-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'gray': 'prose-a:text-gray-700! dark:prose-a:text-gray-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
  }

  const tailColorMap: Record<string, string> = {
    'red': 'prose-a:text-red-300! dark:prose-a:text-red-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'yellow': 'prose-a:text-yellow-300! dark:prose-a:text-yellow-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'orange': 'prose-a:text-orange-300! dark:prose-a:text-orange-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'green': 'prose-a:text-green-300! dark:prose-a:text-green-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'sky': 'prose-a:text-sky-300! dark:prose-a:text-sky-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'blue': 'prose-a:text-blue-300! dark:prose-a:text-blue-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'purple': 'prose-a:text-purple-300! dark:prose-a:text-purple-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'pink': 'prose-a:text-pink-300! dark:prose-a:text-pink-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
    'gray': 'prose-a:text-gray-300! dark:prose-a:text-gray-300! prose-a:hover:text-black! dark:prose-a:hover:text-white!',
  }
  
  return {

  "button" : `
    p-2 px-5 
    border border-black dark:border-white!
    bg-white dark:bg-black hover:bg-black dark:hover:bg-white 
    text-black dark:text-white hover:text-white dark:hover:text-black 
    cursor-pointer button
  `,

  "find-bar" : `
    w-full px-5 py-2
    border border-black dark:border-gray-200
    dark:bg-black! text-black dark:text-white!
  `,

  "find-bar-big" : `
    w-full px-5 py-2
    border-0 dark:border dark:border-gray-200
    bg-gray-200 dark:bg-black!
    placeholder:text-gray-300 placeholder:text-3xl
    focus:ring-2! text-2xl
  `,

  "find-button" : `
    ${buttonColorMap[colorScheme] || buttonColorMap['green']} text-white hover:text-white!
  `,

  "head-wrap" : `
    w-full py-5 sticky top-0 !z-[200]
    bg-gradient-to-t from-gray-900 to-gray-600
    text-white shadow-xl
  `,

  "head-wrap-navs" : `
    w-full max-w-screen-lg mx-auto px-5
    flex items-center justify-between gap-5
  `,

  "head-branding-logo" : `
    border-4 border-white mr-5 rounded-full
    drop-shadow
  `,

  "head-branding-name" : `
    text-3xl uppercase
  `,

  "head-branding-subs" : `
    hidden md:inline text-sm
  `,

  "main-apex" : `bg-zinc-100 dark:bg-zinc-800`,
  "main-apex-first" : `text-lg md:text-2xl`,
  "main-apex-second" : `text-sm md:text-lg`,

  "home-head" : `bg-gradient-to-b drop-shadow-md
    ${homeHeadColorMap[colorScheme] || homeHeadColorMap['green']} py-10
  `,

  "list-text" : `
    w-3/4 md:w-full max-w-screen-lg mx-auto prose
    prose-h1:text-4xl md:prose-h1:text-6xl prose-h2:text-3xl md:prose-h2:text-5xl prose-h2:mb-5 prose-h2:font-sans
    prose-h3:text-2xl md:prose-h3:text-4xl prose-h3:mb-5 prose-h3:font-sans
    prose-p:text-lg prose-p:my-5 prose-p:leading-relaxed     
    ${proseColorMap[colorScheme] || proseColorMap['green']}
    prose-a:no-underline prose-a:hover:underline 
    text-black dark:text-white dark:prose-h1:text-white dark:prose-strong:!text-white
  `,

  "list-text-ctas-wrap" : `
    my-5 py-2 flex justify-center text-center
  `,

  "post-head-sect" : `
    !bg-gradient-to-b from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 dark:text-white py-5 border-t border-t-gray-200 dark:border-t-gray-600
  `,

  "post-head-title" : `text-3xl md:text-5xl font-bold`,

  "post-head-subtitle" : `text-xl md:text-2xl`,

  "post-head-date" : `text-md md:text-xl`,

  "post-head-edit" : `text-center hover:underline`,

  "post-main-sect" : `
    border-t border-t-gray-200 dark:border-t-gray-600
    prose-headings:mt-5
    prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-xl
    prose-p:my-5 prose-pre:my-10 prose-li:mb-2
    prose-code:text-white prose-code:bg-[#23241f] 
    ${proseColorMap[colorScheme] || proseColorMap['green']}
    prose-a:hover:underline font-light 
    prose-headings:font-bold prose-strong:font-bold prose-headings:mt-5
  `,

  "post-nook-sect" : `
    !bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-gray-800 dark:to-gray-900
    text-sm lg:text-md py-5
  `,

  "post-nook-item" :`
    focus:ring-offset-2 dark:focus:ring-4
    bg-white dark:bg-black! hover:bg-black dark:hover:bg-gray-300!
    text-black dark:text-white! hover:text-white dark:hover:text-black!
    border border-black dark:border-gray-600!
    p-2 px-5 m-2 inline-block
    cursor-pointer
  `,

  "post-xtra-sect" : `
    border-t border-t-gray-200 dark:border-t-gray-600  
    ${proseColorMap[colorScheme] || proseColorMap['green']}
    prose-a:hover:underline
    prose-headings:font-bold
    prose-headings:mt-5
    prose-p:my-5
    font-light prose-strong:font-bold
    prose-h2:text-4xl prose-h3:text-3xl prose-code:text-white prose-code:bg-[#23241f]
  `,

  "tail-wrap" : `
    border-t border-gray-300 mt-auto p-5
    bg-gradient-to-b from-gray-700 to-black
  `,

  "tail-prop" : `
    flex max-md:flex-col justify-between gap-0 md:gap-5 p-5
    prose prose-p:text-white prose-p:my-2 md:prose-p:my-0
    ${tailColorMap[colorScheme] || tailColorMap['green']}
    prose-a:font-bold prose-a:no-underline
    prose-a:hover:underline prose-a:hover:text-white!
  `,
  }
}

// default styling and colors
export const styling = getStyling('green')
export const colors = getColors('green')

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
  : "page will load shortly ... thanks for your patience!",

  "menu"
  : "Menu",

  "newer"
  : "newer",

  "nooks"
  : "nooks",

  "nooks filed under"
  : "filed under",

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