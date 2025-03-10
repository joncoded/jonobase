
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

export const heap = `
  _id,
  title,
  slug,
  lists[0...30]->{          
    "slug" : slug.current
  }
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

export const list = `
  _id,
  title,
  slug,
  subtitle,
  bgColor, 
  precontent,        
  posts[]->{
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
    title,
    _id,
    link,
    "image" : image.asset->url,
    kind
  }       
`