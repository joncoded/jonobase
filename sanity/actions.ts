
/*
jonobase by @jonchius
/sanity/actions.ts
a collection of various functions that gets content from the sanity back-end
(use with /sanity/fields.ts)

- getBase, getHeap, getList
- getPosts, getPostsRandomly, getPostsCount
- getPost, getPostAdjacent

*/

import { groq } from "next-sanity"
import { readClient } from "./lib/client"
import { buildQuery } from "./utils"
import * as myprops from "./myprops"
import * as fields from "./fields"

// Simple in-memory cache for local/dev speedups (per server instance)
type CacheEntry = { ts: number; value: any }
const CACHE_TTL = 1000 * 60 // 60 seconds
const cache = new Map<string, CacheEntry>()

function cacheGet(key: string) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.ts > CACHE_TTL) {
    cache.delete(key)
    return null
  }
  return entry.value
}

function cacheSet(key: string, value: any) {
  cache.set(key, { ts: Date.now(), value })
}

// get single "base" (i.e. website) data
export const getBase = async (domain: string) => {

  const cacheKey = `base:${domain}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  try {
    let base = await readClient.fetch(
      groq`*[_type == "base" && domain == $domain] {${fields.base}}`,
      { domain }
    )

    if (!base[0]) {
      base = await readClient.fetch(
        groq`*[_type == "base"] {${fields.base}}`
      )
    }

    cacheSet(cacheKey, base[0])
    return base[0]

  } catch (error) {

    console.log("Base not found: ", error)

  }

}

// get single "heap" (i.e. a custom page of "list"s, see below)
export const getHeap = async (slug: string) => {

  const cacheKey = `heap:${slug}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  try {

    const heaps = await readClient.fetch(
      groq`*[_type == 'heap' && slug.current == $slug]{${fields.heap}}`,
      { slug }
    )

    cacheSet(cacheKey, heaps[0])
    return heaps[0]

  } catch (error) {

    console.log("Heap not found: ", error)

  }

}

// get single "list" (i.e. a horizontal section of a page)
export const getList = async (slug: string) => {

  const cacheKey = `list:${slug}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  try {

    const lists = await readClient.fetch(
      groq`*[_type == 'list' && slug.current == $slug]{${fields.list}}`,
      { slug }
    )
    
    cacheSet(cacheKey, lists[0])
    return lists[0]

  } catch (error) {

    console.log("List not found: ", error)

  }

}

// get multiple posts - either all items (everything blank) or filtered by a search term
export const getPosts = async (criteria: myprops.PostGetterProps) => {

  const { domain = '', query = '', join = '', kind = '', page = '1', nook = '', perPage = '6', order = 'date', ascDesc = 'desc'} = criteria

  const cacheKey = `posts:${domain}:${query}:${join}:${kind}:${nook}:${page}:${perPage}:${order}:${ascDesc}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  try {

    const postMeetingCriteria = await readClient.fetch(
      groq`${buildQuery({domain, query, join, kind,
        nook: decodeURIComponent(nook),
        page: parseInt(page),
        perPage: parseInt(perPage),
        order,
        ascDesc
      })} {
        ${fields.postCard}
      }`
    )    

    cacheSet(cacheKey, postMeetingCriteria)
    return postMeetingCriteria

  } catch (error) {

    console.log("Post(s) not found: ", error)

  }

}

// get X number of random post(s)
export const getPostsRandomly = async (criteria: myprops.PostGetterProps, count: number) => {

  try {

    // get all post of the same criteria
    const postMeetingCriteria = await getPosts({
      domain: criteria.domain || '*',
      query: criteria.query || '*',
      join: criteria.join || '',      
      kind: criteria.kind || '',
      nook: criteria.nook || ''
    })

    // get random indices as an array of numbers
    // handle empty result set
    if (!postMeetingCriteria || postMeetingCriteria.length === 0) return []

    // if requested count is greater or equal to available posts, return a slice
    if (count >= postMeetingCriteria.length) {
      return postMeetingCriteria.slice(0, count)
    }

    // get unique random indices
    const randomIndices: number[] = []
    while (randomIndices.length < count) {
      const randomIndex = Math.floor(Math.random() * postMeetingCriteria.length)
      if (randomIndices.indexOf(randomIndex) === -1) randomIndices.push(randomIndex)
    }

    // now collect the posts
    const randomPosts = randomIndices.map(i => postMeetingCriteria[i])
    return randomPosts
    
  } catch (error) {

    console.log("Random post not found: ", error)

  }

}

// get the total count of a query before the perPage kicks in
export const getPostsCount = async (criteria: myprops.PostGetterProps) => {

  const { domain = '', query = '', join = '', kind = '', nook = '' } = criteria

  try {

    const postCount = await readClient.fetch(
      groq`${buildQuery({        
        isCount: true,
        domain, 
        query,
        join,
        kind,
        nook: decodeURIComponent(nook)
      })}`
    )    

    return postCount

  } catch (error) {

    console.log("Post count not found: ", error)

  }

}

// get single "post", given a type and a slug
export const getPost = async ({ slug } : { slug : string }) => {

  try {

    const posts = await readClient.fetch(
      groq`*[_type == 'post' && slug.current == $slug]{${fields.post}}`,
      { slug }
    )

    return posts[0]

  } catch (error) {

    console.log("Post not found: ", error)

  }

}

// get single "post", that is either older or newer than the date of a "current post" of a type (or none at all)
export const getPostAdjacent = async (domain: string, date: string, mode: 'older' | 'newer', join: string, kind: string, nook?: string) => {

  try {

    const operation = (mode === 'older' ? '<' : '>')
    const order = (mode === 'older' ? 'desc' : 'asc')
    
    const adjacentQuery = `*[
      ${domain ? `"${domain}" in base[]->.domain &&` : ``} 
      ${join ? `lower(join) == '${join.toLowerCase()}' &&` : ``}
      ${kind ? `lower(kind) == '${kind.toLowerCase()}' &&` : ``}
      ${nook ? `lower('${nook}') in nooks &&` : ``}     
      date ${operation} '${date}'
    ] | order(date ${order}){${fields.postLite}}`

    const posts = await readClient.fetch(
      groq`${adjacentQuery}`
    )

    return posts[0] || undefined

  } catch (error) {

    console.log("Adjacent post not found: ", error)

  }

}

// get full heap with lists and list-specific posts in one GROQ request (best-effort)
export const getHeapFull = async (slug: string, domain: string) => {
  const cacheKey = `heapFull:${slug}:${domain}`
  const cached = cacheGet(cacheKey)
  if (cached) return cached

  try {
    const query = groq`
      *[_type == 'heap' && slug.current == $slug][0]{
        ${fields.heap},
        lists[0...30]->{
          ${fields.list},
          "posts": *[_type == 'post' && (
            (
              defined(^.querybuilder.query) && (
                (title match ('*' + lower(^.querybuilder.query) + '*')) ||
                (subtitle match ('*' + lower(^.querybuilder.query) + '*'))
              )
            ) || true
          ) && base[domain == $domain]] | order(date desc)[0...(^.querybuilder.count || 1)]{${fields.postCard}}
        }
      }
    `

    const heap = await readClient.fetch(query, { slug, domain })
    cacheSet(cacheKey, heap)
    return heap
  } catch (error) {
    console.error('getHeapFull failed, falling back:', error)
    return null
  }

}