import { groq } from 'next-sanity'
import { readClient } from './lib/client'
import { buildQuery } from './utils'
import { GetResourceParams } from '@/lib/types'

export const getResourcesPlaylist = async () => {
 
  try {
    const resources = await readClient.fetch(
      groq`*[_type == "resourcePlaylist"]{        
        _id,
        title,
        resources[0...6]->{
          title,
          _id,
          link,
          "image" : image.asset->url,
          views,
          category
        }        
      }`    
    )

    return resources

  } catch (error) {

    console.log(error)

  }
}

export const getResources = async (params: GetResourceParams) => {
  
  const { query, category, page } = params
  
  try {
    const resources = await readClient.fetch(
      groq`${buildQuery({
        type: 'resource',
        query,
        category,
        page: parseInt(page),
      })}{
        title,
        _id,
        link,
        "image": image.asset->url,
        views,
        slug,
        category
      }`    
    )

    return resources

  } catch (error) {

    console.log(error)

  }
}