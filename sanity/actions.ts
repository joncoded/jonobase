
/*
jonobase by @jonchius
/sanity/actions.ts
a collection of various functions that gets content from the sanity studio
(use with /sanity/fields.ts)

- getBase, getHeap, getList
- getOpera, getOperaRandomly, getOperaCount
- getOpus, getOpusAdjacent

*/

import { groq } from 'next-sanity'
import { readClient } from './lib/client'
import { buildQuery } from './utils'
import * as myprops from './myprops'
import * as fields from './fields'
import { findableTypes } from './schemas'

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

// get mutiple "list"s
export const getLists = async () => {

  try {

    const lists = await readClient.fetch(
      groq`*[_type == 'list']{${fields.lists}}`
    )

    return lists

  } catch (error) {

    console.log("List(s) not found: ", error)

  }

}

// get multiple "opera" (i.e. "opus"es) - either all items or filtered by a search term
export const getOpera = async (criteria: myprops.OpusGetterProps) => {

  const { query = '', type = '', kind = '', page = '1', nook = '', perPage = '6'} = criteria

  try {

    const operaMeetingCriteria = await readClient.fetch(
      groq`${buildQuery({type, query, kind,
        nook: decodeURIComponent(nook),
        page: parseInt(page),
        perPage: parseInt(perPage)
      })} {
        ${fields.opus}
      }`
    )    

    return operaMeetingCriteria

  } catch (error) {

    console.log("Post(s) not found: ", error)

  }

}

// get X number of random opera (i.e. "opus"es)
export const getOperaRandomly = async (criteria: myprops.OpusGetterProps, count: number) => {

  try {

    // get all opera of the same criteria
    const operaMeetingCriteria = await getOpera({      
      query: criteria?.query || '',
      type: criteria?.type || '',
      kind: criteria?.kind || '',
      nook: criteria.nook || ''
    })

    // get random indices as an array of numbers
    let randomIndices = []    
    while (randomIndices.length < count) {
      const randomIndex = Math.floor(Math.random() * operaMeetingCriteria.length)
      // no repeat indices pushed!
      if (randomIndices.indexOf(randomIndex) === -1)
        randomIndices.push(randomIndex)
    }

    // now we push the opera
    let randomOpera = []
    for (let r = 0; r < randomIndices.length; r++) {
      randomOpera.push(operaMeetingCriteria[randomIndices[r]])
    }
    
    return randomOpera
    
  } catch (error) {

    console.log("Random post not found: ", error)

  }

}

// get the total count of a query before the perPage kicks in
export const getOperaCount = async (criteria: myprops.OpusGetterProps) => {

  const { query = '', type = '', kind = '', nook = '' } = criteria

  try {

    const operaCount = await readClient.fetch(
      groq`${buildQuery({    
        isCount: true,     
        type,
        query,
        kind,
        nook: decodeURIComponent(nook)
      })}`
    )    

    return operaCount

  } catch (error) {

    console.log("Post count not found: ", error)

  }

}

// get single "opus", given a type and a slug
export const getOpus = async ({type = 'post', kind, slug} : { type: string, kind: string, slug: string }) => {

  try {

    const posts = await readClient.fetch(
      groq`*[_type == '${type}' && lower(kind) == '${kind.toLowerCase()}' && slug.current == '${slug}']{${fields.opus}}`
    )

    return posts[0]

  } catch (error) {

    console.log("Opus not found: ", error)

  }

}

// get single "opus", that is either older or newer than the date of a "current post" of a type (or none at all)
export const getOpusAdjacent = async (type: string, date: string, mode: 'older' | 'newer', kind?: string, nook?: string) => {

  try {

    const operation = (mode === 'older' ? '<' : '>')
    
    const adjacentQuery = `*[
      ${type && `_type == '${type}' &&`}
      _type in ${findableTypes} && 
      ${kind ? `lower(kind) == '${kind.toLowerCase()}' &&` : ``}
      ${nook ? `lower('${nook}') in nooks &&` : ``}     
      date ${operation} '${date}'
    ] | order(date desc){${fields.opusLite}}`

    const posts = await readClient.fetch(
      groq`${adjacentQuery}`
    )

    return posts[0] || undefined

  } catch (error) {

    console.log("Adjacent post not found: ", error)

  }

}