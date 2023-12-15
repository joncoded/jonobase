import { groq } from 'next-sanity'
import { readClient } from './lib/client'
import { buildQuery } from './utils'
import { GetPostsParams } from '@/lib/types'

export const getBase = async (slug: string) => {

  try {
    const base = await readClient.fetch(
      groq`*[_type == "base" && slug.current == '${slug}']{
        _id,
        title,
        intro,
        filters
      }`
    )

    return base[0]
  
  } catch (error) {
  
    console.log("could not get base")

  }

}

export const getList = async (slug: string) => {

  try {

    const lists = await readClient.fetch(
      groq`*[_type == "list" && slug.current == '${slug}']{
        _id,
        title
      }`
    )

    return lists[0] 

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

export const getPost = async (slug: string) => {

  try {

    const posts = await readClient.fetch(
      groq`*[_type == "post" && slug.current == '${slug}']{
        _id,
        title
      }`
    )

    return posts[0] 

  } catch (error) {

    console.log(error)

  }

}