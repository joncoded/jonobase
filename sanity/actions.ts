import { groq } from 'next-sanity'
import { readClient } from './lib/client'
import { buildQuery } from './utils'
import { GetPostsParams } from '@/lib/types'

export const getBase = async (slug: string) => {

  try {
    const base = await readClient.fetch(
      groq`*[_type == "base" && slug.current == '${slug}'] {
        _id,
        title,
        slug, 
        intro,        
        tagline,
        filters,
        metakeywords, 
        colophon1,
        colophon2
      }`
    )

    return base[0]
  
  } catch (error) {
  
    console.log("could not get base")

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

    console.log("could not get categories")

  }

}

export const getHeap = async (slug: string) => {
  
  try {

    const heap = await readClient.fetch(
      groq`*[_type == "heap" && slug.current == '${slug}']{
        _id,
        title,
        lists->{
          title,
          subtitle,
          posts,
          content          
        }
      }`
    )

    return heap

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
        posts[0...12]->{
          title,
          _id, 
          content,
          link,
          "image" : image.asset->url,
          category
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
        posts[0...12]->{
          title,
          _id,
          link,
          "image" : image.asset->url,
          category
        }        
      }`    
    )

    return lists

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
      })} | order(date desc) {
        _id,
        slug,
        "image": image.asset->url,
        title,
        emoji,
        subtitle,
        category,
        link,
        moods,
        date
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
        slug,
        "image": image.asset->url,
        title,
        emoji,
        subtitle,
        category,
        content,
        link,
        moods,        
        date
      }`
    )

    return posts[0] 

  } catch (error) {

    console.log(error)

  }

}