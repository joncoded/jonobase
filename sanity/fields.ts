
/*
jonobase by @jonchius
/sanity/fields.ts
fields for the queries 
(use with /sanity/actions.ts)
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

export const post = `
  _id,
  "slug": slug.current,
  "image": image.asset->url,
  title,
  emoji,
  subtitle,
  kind,
  content,
  link,
  nooks,        
  date, 
  showDate
`

export const postCard = `
  _id,
  "slug": slug.current,
  "image": image.asset->url,
  title,
  emoji,
  subtitle,
  kind,
  link,
  nooks,        
  date,
  showDate
`

export const postLite = `
  _id,
  "slug": slug.current,
  title,
  date
`

export const side = `
  _id,
  "slug": slug.current,
  "image": image.asset->url,
  title,
  emoji,
  subtitle,
  content,      
  date, 
  showDate
`

export const wiki = `
  _id,
  "slug": slug.current,
  "image": image.asset->url,
  title,
  emoji,
  subtitle,
  content,
  extra,
  nooks,   
  date, 
  showDate
`