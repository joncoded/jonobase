
/*
jonobase by @jonchius
/app/components/utils.ts
query building helper methods
*/


import qs from 'query-string'
import { UtilQueryBuildingProps, UtilQueryURLProps } from '@/lib/types'

export function buildQuery(params: UtilQueryBuildingProps) {

  const { type, query, kind, mood = '', page = 1, perPage = 6 } = params

  const conditions = [`*[_type=="${type}"`]

  if (query) conditions.push(`title match "*${query}*"`)

  if (kind && kind !== "all") {
    conditions.push(`kind == "${kind}"`)
  }

  if (mood && mood !== "all") {
    conditions.push(`lower("${mood}") in moods`)
  }

  const offset = (page - 1) * perPage
  const limit = offset + perPage 

  const final = conditions.length > 1
  ? `${conditions[0]} && (${conditions
      .slice(1)
      .join(" && ")})]| order(date desc)[${offset}...${limit}]`
  : `${conditions[0]}]| order(date desc)[${offset}...${limit}]`

  return final

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