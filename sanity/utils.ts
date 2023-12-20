import qs from 'query-string'
import { UtilQueryBuildingProps, UtilQueryURLProps } from '@/lib/types'

export function buildQuery(params: UtilQueryBuildingProps) {
  const { type, query, category, page = 1, perPage = 20 } = params

  const conditions = [`*[_type=="${type}"`]

  if (query) conditions.push(`title match "*${query}*"`)

  if (category && category !== "all") {
    conditions.push(`category == "${category}"`)
  }

  const offset = (page - 1) * perPage
  const limit = perPage

  return conditions.length > 1
    ? `${conditions[0]} && (${conditions
        .slice(1)
        .join(" && ")})][${offset}...${limit}]`
    : `${conditions[0]}][${offset}...${limit}]`
}

export function formUrlQuery({ params, key, value, keysToRemove }: UtilQueryURLProps) {

  const currentUrl = qs.parse(params)

  if (keysToRemove) {
    keysToRemove.forEach((keyToRemove) => {
      delete currentUrl[keyToRemove]
    })
  } else if (key && value) {
    currentUrl[key] = value
  }  

  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  )
}