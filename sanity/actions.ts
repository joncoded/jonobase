
/*
jonobase by @jonchius
/sanity/actions.ts
a collection of various functions that gets content from the sanity back-end
(use with /sanity/fields.ts)

- getBase, getHeap, getList
- getPosts, getPostsRandomly, getPostsCount
- getPost, getPostAdjacent

*/

import { groq } from 'next-sanity'
import { readClient } from './lib/client'
import { buildQuery } from './utils'
import * as myprops from './myprops'
import * as fields from './fields'

// get single "base" (i.e. website) data
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

// get single "heap" (i.e. a custom page of "list"s, see below)
export const getHeap = async (slug: string) => {

  try {

    const heaps = await readClient.fetch(
      groq`*[_type == 'heap' && slug.current == '${slug}']{${fields.heap}}`
    )

    return heaps[0]

  } catch (error) {

    console.log("Heap not found: ", error)

  }

}

// get single "list" (i.e. a horizontal section of a page)
export const getList = async (slug: string) => {

  try {

    const lists = await readClient.fetch(
      groq`*[_type == 'list' && slug.current == '${slug}']{${fields.list}}`
    )
    
    return lists[0]

  } catch (error) {

    console.log("List not found: ", error)

  }

}

// get multiple "posts" - either all items (everything blank) or filtered by a search term
export const getPosts = async (criteria: myprops.PostGetterProps) => {

  const { query = '', join = '', kind = '', page = '1', nook = '', perPage = '6', order = 'date', ascDesc = 'desc'} = criteria

  try {

    const postMeetingCriteria = await readClient.fetch(
      groq`${buildQuery({query, join, kind,
        nook: decodeURIComponent(nook),
        page: parseInt(page),
        perPage: parseInt(perPage),
        order,
        ascDesc
      })} {
        ${fields.postCard}
      }`
    )    

    return postMeetingCriteria

  } catch (error) {

    console.log("Post(s) not found: ", error)

  }

}

// get X number of random post (i.e. "post"es)
export const getPostsRandomly = async (criteria: myprops.PostGetterProps, count: number) => {

  try {

    // get all post of the same criteria
    const postMeetingCriteria = await getPosts({      
      query: criteria.query || '*',
      join: criteria.join || '',      
      kind: criteria.kind || '',
      nook: criteria.nook || ''
    })

    // get random indices as an array of numbers
    let randomIndices = []    
    while (randomIndices.length < count) {
      const randomIndex = Math.floor(Math.random() * postMeetingCriteria.length)
      // no repeat indices pushed!
      if (randomIndices.indexOf(randomIndex) === -1)
        randomIndices.push(randomIndex)
    }

    // now we push the post
    let randomPosts = []
    for (let r = 0; r < randomIndices.length; r++) {
      randomPosts.push(postMeetingCriteria[randomIndices[r]])
    }
    
    return randomPosts
    
  } catch (error) {

    console.log("Random post not found: ", error)

  }

}

// get the total count of a query before the perPage kicks in
export const getPostsCount = async (criteria: myprops.PostGetterProps) => {

  const { query = '', join = '', kind = '', nook = '' } = criteria

  try {

    const postCount = await readClient.fetch(
      groq`${buildQuery({    
        isCount: true,             
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
      groq`*[_type == 'post' && slug.current == '${slug}']{${fields.post}}`
    )

    return posts[0]

  } catch (error) {

    console.log("Post not found: ", error)

  }

}

// get single "post", that is either older or newer than the date of a "current post" of a type (or none at all)
export const getPostAdjacent = async (date: string, mode: 'older' | 'newer', join: string, kind: string, nook?: string) => {

  try {

    const operation = (mode === 'older' ? '<' : '>')
    
    const adjacentQuery = `*[      
      ${join ? `lower(join) == '${join.toLowerCase()}' &&` : ``}
      ${kind ? `lower(kind) == '${kind.toLowerCase()}' &&` : ``}
      ${nook ? `lower('${nook}') in nooks &&` : ``}     
      date ${operation} '${date}'
    ] | order(date desc){${fields.postLite}}`

    const posts = await readClient.fetch(
      groq`${adjacentQuery}`
    )

    return posts[0] || undefined

  } catch (error) {

    console.log("Adjacent post not found: ", error)

  }

}