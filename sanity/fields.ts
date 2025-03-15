
/*
jonobase by @jonchius
/sanity/fields.ts
field enumerations for the queries
(used only with /sanity/actions.ts)

- post, postCard, postLite
- list, lists, heap, base

*/

/* 
posts : a single page of content
*/

// post data for pages
export const post = `
  _id,
  _type,
  "slug": slug.current,
  "image": image.asset->url,
  title,
  emoji,
  subtitle,
  join,
  kind,  
  link,  
  date,
  showDate,
  content,
  extra,
  nooks
`

// post data for lists (i.e. links to posts)
export const postCard = `
  _id,
  _type,
  "slug": slug.current,
  "image": image.asset->url,
  title,
  emoji,
  subtitle,
  join,
  kind,
  link,
  date,
  showDate
`

// post data for page turners
export const postLite = `
  _id,
  _type,
  "slug": slug.current,
  title,
  emoji, 
  join, 
  kind, 
  subtitle, 
  date,
  showDate
`

/*
list : a collection of posts!
*/

export const list = `
  _id,
  title,
  showtitle,
  "slug": slug.current,
  subtitle,
  showsubtitle,
  bgColor,
  precontent,
  querybuilder,
  postcontent,
  cta,
  showtype,
  showkind,
  showjoin
`

export const lists = `
  _id,
  title,
  posts[0...30]->{
    _id,
    title,
    "image" : image.asset->url,
    _type,
    kind,
    link
  }
`

/*
heap : a collection of lists!
*/

export const heap = `
  _id,
  title,
  slug,
  lists[0...30]->{
    "slug" : slug.current
  }
`

 /* 
base : a collection of heaps!
*/

export const base = `
  _id,
  title,
  slug,
  intro,
  "logo": logo.asset->url,  
  featuredPostsTitle,
  "featured" : featured->slug.current,
  latestPostsTitle,
  tagline,
  perPage,
  menu,
  filters,
  metakeywords,
  colophon1,
  colophon2
`