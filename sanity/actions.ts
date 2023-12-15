import { groq } from 'next-sanity'
import { readClient } from './lib/client'
import { buildQuery } from './utils'
import { GetPostsParams } from '@/lib/types'

export const getBase = async () => {

  try {
    const base = await readClient.fetch(
      groq`*[_type == "base"]{
        _id,
        title,
        intro
      }`
    )

    return base
  
  } catch (error) {
  
    console.log(error)

  }

}

export const getLists = async () => {
 
  try {
    const list = await readClient.fetch(
      groq`*[_type == "list"]{        
        _id,
        title,
        posts[0...6]->{
          title,
          _id,
          link,
          "image" : image.asset->url,
          category
        }        
      }`    
    )

    return list

  } catch (error) {

    console.log(error)

  }
}

export const getPosts = async (params: GetPostsParams) => {
  
  const { query, category, page } = params
  
  try {
    const posts = await readClient.fetch(
      groq`${buildQuery({
        type: 'post',
        query,
        category,
        page: parseInt(page),
      })}{
        title,
        _id,
        link,
        "image": image.asset->url,
        slug,
        category
      }`    
    )

    return posts

  } catch (error) {

    console.log(error)

  }
}