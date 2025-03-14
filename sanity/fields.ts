
/*
jonobase by @jonchius
/sanity/fields.ts
field enumerations for the queries
(used only with /sanity/actions.ts)

- opus, opusCard, opusLite
- list, lists, heap, base

*/

/* 
opera 
(plural of "opus", 
i.e. content entries such as posts, sides, wikis, etc.)
*/

// for single pages of posts/sides/wikis/zines/etc.
export const opus = `
  _id,
  _type,
  "slug": slug.current,
  "image": image.asset->url,
  title,
  emoji,
  subtitle,
  kind,  
  link,  
  date,
  showDate,
  content,
  extra,
  nooks
`

// entry data when listing links to single pages
export const opusCard = `
  _id,
  _type,
  "slug": slug.current,
  "image": image.asset->url,
  title,
  emoji,
  subtitle,
  kind,
  link,
  date,
  showDate
`

// entry data (the concise version) 
export const opusLite = `
  _id,
  _type,
  "slug": slug.current,
  title,
  emoji, 
  kind, 
  subtitle, 
  date,
  showDate
`

// lists of opera

export const list = `
  _id,
  title,
  slug,
  subtitle,
  bgColor,
  precontent,
  posts[]->{
    ${opus}
  },
  postcontent,
  cta->{
    url,
    title
  }
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

// lists of lists

export const heap = `
  _id,
  title,
  slug,
  lists[0...30]->{
    "slug" : slug.current
  }
`

// the system (TODO: fields need a bit of cleaning up)

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