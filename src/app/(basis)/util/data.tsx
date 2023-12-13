
/*
jonobase
/app/(basis)/util/data.tsx
access to the database and other variables
*/

import PocketBase from 'pocketbase'

const pb = new PocketBase(process.env.PBDOMAIN) 
pb.autoCancellation(false)

// this gets the metadata of the web app

export async function getBase() {

  const app = await pb.collection('bases')
    .getFirstListItem(`slug='${process.env.PBSLUG}'`)
  
  const lang = await pb.collection('i18ns')
    .getFirstListItem(`id='${app.language}'`)

  return { app, lang }

}

// this gets only the ID of the web app

export async function getBaseID() {

  
  

  const { id } = await pb.collection('bases')
    .getFirstListItem(`slug='${process.env.PBSLUG}'`)

  return id

}

// this gets the home page content

export async function getHomePage() {

  try {


    const app = await pb.collection('bases')
      .getFirstListItem(`slug='${process.env.PBSLUG}'`, { "expand": "homepage_content" })

    return { app }

  } catch {
    
    return { app: { expand: { homepage_content: {}}} }

  }

}

// this gets the number of posts (with or without filters) without pagination

export async function getUnpagedPostsCount(
  find: string = '', 
  kind: string = '',
  list: string = '',   
) {

  const base = await getBaseID()

  const data = { pb, base, find, kind, list }
  const filtering = await getQueryFilter(data)
  
  const items = await pb.collection('posts')
    .getFullList({
      filter: filtering
    }) 
    
  return items.length
}

// this gets a set of posts

export async function getPosts(
  find: string = '%',
  kind: string = '%',
  list: string = '',
  page: number = 1,
  limit: number = 6,
  descending: 'asc' | 'desc' | '' = 'desc'
) {

  const base = await getBaseID() 

  const data = { pb, base, find, kind, list }
  const filtering = await getQueryFilter(data)

  let sorting = `-featured, -created, -backdated`
  if (descending === 'asc') {
    sorting = `-featured, +created, +backdated`
  } 

  const items = await pb.collection('posts')
    .getList(page, limit, { 
      sort: sorting,
      filter: filtering,
      expand: 'kind,lists'
    })  

  return items 

}

// this gets a single post

export async function getPost(
  slug: string,
) {

  try {

    const post = await pb.collection('posts')
      .getFirstListItem(`
        slug='${slug}'
      `, { expand: 'kind,lists' })

    return { post }

  } catch {

    const post = {
      title: '',
      kind: '',
      lists: [],
      thumbnail: '',
      collectionId: '',
      id: ''
    }
    return { post }
  
  }

}

// this gets a single older or newer post 

export async function getAdjacentPost(
  post: any,
  direction: "newer" | "older",
  filter: "site" | "kind"
) {

  let filtering = '', sorting = ''
  
  try {
    
    const base = await getBaseID()

    if (base !== '') 
      filtering += ` bases?~'${base}' &&`

    switch (filter) {
      // get all the posts
      case "site":
        filtering += ``
        break;
      // filter by post kind
      case "kind":
        filtering += `kind='${post.kind}' && `
        break;
    }

    switch (direction) {
      case "newer":
        filtering += `created > '${post.created}'`
        sorting += `created`
        break;
      case "older":
        filtering += `created < '${post.created}'`
        sorting += `-created`
        break;
    }

    // ensure all posts are published
    filtering += ` && status='published'`

    const adjacentPost = await pb.collection('posts')
      .getFirstListItem(filtering,
        {
          sort: sorting,
          filter: filtering,
          expand: 'bases,files,kind,lists',
        }
      )
      
    return adjacentPost
    
  } catch {

    return null

  }

}

// this gets a "take": a set of one or more *views* 

export async function getTake(
  slug: string
) {

  try {

    const take = await pb.collection('takes')
      .getFirstListItem(`slug='${slug}'`,
        { expand: 'views' }
      )    
  
    return { take }
  
  } catch {

    const take = { public_name: '', views: [], expand: { views: [{}]} }

    return { take }

  }

}

// a helper for the getUnpagedPostsCount and getPosts

export async function getQueryFilter({ pb, base, find, kind, list }: any ) {

  let filtering = ''

  if (base !== '')
    filtering += ` bases?~'${base}'`
  if (find !== 'all')
    filtering += ` && (
      title?~'%${find}%' || 
      summary?~'%${find}%' || 
      content?~'%${find}%' 
    )`  

  if (kind !== 'all') {

    // search for the kind in the kinds table
    const { items: kinds } = await pb.collection('kinds')
      .getList(1, 1, { filter: `slug='${kind}' || id='${kind}'`})

    // if the desired kind exists, then get its id
    if (kinds[0]) {
      // add the kind id to the filter
      filtering += ` && kind?~'${kinds[0].id}'`
    } else {
      // or else, ensure nothing returns by using a bogus query
      filtering += (kind) ? ` && kind='NULL DO NOT SEARCH'` : ''
    }
  
  }
  
  if (list !== 'all') {
  
    // search for the list in the lists table
    const { items: lists } = await pb.collection('lists')
      .getList(1, 1, { filter: `slug='${list}' || id='${list}'`})

      // if the desired list exists, then get its id
    if (lists[0]) { 
      // add the list id to the filter
      filtering += ` && lists?~'${lists[0].id}'` 
    } else {
      // or else, ensure nothing returns by using a bogus query
      filtering += (list) ? ` && lists='NULL DO NOT SEARCH'` : ''
    }
  
  }

  // ensure all posts are published
  filtering += ` && status='published'`

  return filtering

}