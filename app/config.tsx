
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
  : "text-green-700",

  "darkLink"
  : "text-green-300",

  "linkHover"
  : "text-black",

  "darkLinkHover"
  : "text-white"

}

// common tailwind styles
export const styling = {

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
    bg-green-800! hover:bg-black text-white hover:bg-green-600! hover:text-white! border-green-800! hover:border-green-600!
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
    from-green-200 dark:from-green-900 to-green-300 dark:to-green-800 py-10
  `,

  "list-text" : `
    w-3/4 md:w-full max-w-screen-lg mx-auto prose
    prose-h1:text-4xl md:prose-h1:text-6xl prose-h2:text-3xl md:prose-h2:text-5xl prose-h2:mb-5 prose-h2:font-sans
    prose-h3:text-2xl md:prose-h3:text-4xl prose-h3:mb-5 prose-h3:font-sans
    prose-p:text-lg prose-p:my-5 prose-p:leading-relaxed     
    prose-a:${colors.link}! dark:prose-a:${colors.darkLink}!
    prose-a:hover:${colors.linkHover}! dark:prose-a:hover:${colors.darkLinkHover}!
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
    prose-a:${colors.link} dark:prose-a:${colors.darkLink}
    prose-a:hover:${colors.linkHover} dark:prose-a:hover:${colors.darkLinkHover}
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
    prose-a:${colors.link} dark:prose-a:${colors.darkLink} prose-a:hover:underline
    prose-a:hover:${colors.linkHover} dark:prose-a:hover:${colors.darkLinkHover}
    prose-headings:font-bold
    prose-headings:mt-5
    prose-p:my-5
    font-light prose-strong:font-bold
    prose-h2:text-4xl prose-h3:text-3xl prose-code:text-white prose-code:bg-[#23241f]
  `,

  "tail-wrap" : `
    border-t border-gray-300 mt-auto p-5
    bg-gradient-to-b from-black to-gray-900
  `,

  "tail-prop" : `
    flex max-md:flex-col justify-between gap-0 md:gap-5 p-5
    prose prose-p:text-white prose-p:my-2 md:prose-p:my-0
    prose-a:text-green-300
    prose-a:font-bold prose-a:no-underline
    prose-a:hover:underline prose-a:hover:text-white
  `,
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