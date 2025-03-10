
/*
jonobase by @jonchius
/sanity/actions.ts
the query list
*/

import { groq } from 'next-sanity'
import { readClient } from './lib/client'
import { buildQuery } from './utils'
import { ListProps, PostGetterProps } from '@/lib/types'

// add query fields into sanity/fields.ts
import * as fields from './fields'

export const getBase = async (slug: string) => {

  try {
    const base = await readClient.fetch(
      groq`*[_type == "base" && slug.current == '${slug}'] {${fields.base}}`
    )

    return base[0]
  
  } catch (error) {
  
    console.log("Base not found: ", error)

  }

}

export const getCategories = async (slug: string) => {

  try {

    const base = await readClient.fetch(
      groq`*[_type == "base" && slug.current == '${slug}']{
        filters
      }`
    )

    return base[0].filters

  } catch (error) {

    console.log(error)

  }

}

export const getHeap = async (slug: string) => {
  
  try {

    const heaps = await readClient.fetch(
      groq`*[_type == "heap" && slug.current == '${slug}']{
        _id,
        title,
        slug,
        lists[0...30]->{          
          "slug" : slug.current
        }
      }`
    )
    
    return heaps[0]

  } catch (error) {

    console.log(error)

  }

}

export const getList = async (slug: string) => {

  try {

    const lists = await readClient.fetch(
      groq`*[_type == "list" && slug.current == '${slug}']{
        _id,
        title,
        slug,
        subtitle,
        bgColor, 
        precontent,        
        posts[0...30]->{
          ${fields.postCard}
        },
        postcontent,
        cta->{
          url,
          title
        }
      }`
    )

    return lists[0] 

  } catch (error) {

    console.log(error)

  }

}

export const getLists = async () => {
 
  try {
    const lists = await readClient.fetch(
      groq`*[_type == "list"]{        
        _id,
        title,
        posts[0...30]->{
          title,
          _id,
          link,
          "image" : image.asset->url,
          kind
        }        
      }`    
    )

    return lists

  } catch (error) {

    console.log(error)

  }

}

export const getPosts = async (searchParams: PostGetterProps) => {
  
  const { query, kind, page, perPage } = searchParams  
  
  try {

    const posts = await readClient.fetch(
      groq`${buildQuery({
        type: 'post',
        query,
        kind,
        page: parseInt(page),
        perPage: parseInt(perPage ?? '1000000')
      })} { 
        ${(perPage === '1000000') ? '_id' : fields.post} 
      }`    
    )

    return posts

  } catch (error) {

    console.log(error)

  }

}

export const getPostsByKind = async ({params, searchParams}: ListProps) => {
  
  const { slug } = params
  const { page, perPage } = searchParams   
  const kind = slug?.toString().toLowerCase() || ''
  
  try {

    const posts = await readClient.fetch(
      groq`${buildQuery({
        type: 'post',
        query: '',
        kind,
        nook: '', 
        page: parseInt(page ?? '1'),
        perPage: parseInt(perPage ?? '1000000')
      })} | order(date desc) { 
        ${perPage === '1000000' ? '_id' : fields.postCard} 
      }`    
    )
    
    return posts

  } catch (error) {

    console.log(error)

  }

}

export const getPostsByNook = async ({params, searchParams}: ListProps) => {
  
  const { slug } = params  
  const { page, perPage } = searchParams
  const nook = slug?.toString().toLowerCase() || ''
  
  try {

    const posts = await readClient.fetch(
      groq`${buildQuery({
        type: 'post',
        query: '',
        kind: '',
        nook: decodeURIComponent(nook), 
        page: parseInt(page ?? '1'),
        perPage: parseInt(perPage ?? '1000000')
      })} | order(date desc) { 
        ${perPage === '1000000' ? '_id' : fields.postCard} 
      }`    
    )

    return posts

  } catch (error) {

    console.log(error)

  }

}

export const getPost = async (slug: string) => {

  try {

    const posts = await readClient.fetch(
      groq`*[_type == "post" && slug.current == '${slug}']{${fields.post}}`
    )

    return posts[0] 

  } catch (error) {

    console.log(error)

  }

}

export const getPostAdjacent = async (date: string, mode: 'older' | 'newer') => {

  try {

    const operation = (mode === 'older' ? '<' : '>')
    const posts = await readClient.fetch(
      groq`*[_type == "post" && date ${operation} '${date}'] | order(date desc){${fields.postLite}}`
    )    

    return posts[0] || undefined

  } catch (error) {

    console.log(error)

  }

}

export const getSide = async (slug: string) => {

  try {

    const sides = await readClient.fetch(
      groq`*[_type == "side" && slug.current == '${slug}']{${fields.side}}`
    )      

    return sides[0] 

  } catch (error) {

    console.log(error)

  }

}

export const getWiki = async (slug: string) => {

  try {

    const wikis = await readClient.fetch(
      groq`*[_type == "wiki" && slug.current == '${slug}']{${fields.wiki}}`
    )

    return wikis[0] 

  } catch (error) {

    console.log(error)

  }

}