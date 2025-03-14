
/*
jonobase by @jonchius
/app/components/utils.ts
query building helper methods
*/


import qs from 'query-string'
import { UtilQueryBuildingProps, UtilQueryURLProps } from '@/sanity/myprops'
import { findableSchemas } from './schemas'

// used to build long queries with many components, some of which may or may not appear
export function buildQuery(params: UtilQueryBuildingProps) {

  /* get all the variables based on URL params and query strings (or use defaults listed below) */
  const {
    isCount = false,
    type = '',
    query = '',
    kind = '',
    nook = '',
    page = 1,
    perPage = 1000000,
    order = 'date',
    ascDesc = 'desc'
  } = params

  /* start building a query */

  const conditions = []

  // start
  if (isCount === false)
    conditions.push(`*[`)
  else
    conditions.push(`count(*[`)

  // by type
  if (type) {
    conditions.push(`_type match '${type}' && _type in ${findableSchemas}`)
  } else {
    conditions.push(`_type in ${findableSchemas}`)
  }

  // by query (keyword)
  if (query)
    conditions.push(`
      [title, subtitle, content[].children[].text] match '*${query.toLowerCase()}*'
    `)

  // by kind (category)
  if (kind && kind !== "all") {
    conditions.push(`lower(kind) == '${kind.toLowerCase()}'`)
  }

  // by nook (tag)
  if (nook && nook !== "all") {
    conditions.push(`lower('${nook}') in nooks`)
  }

  // by date (do not show future posts)
  conditions.push(`dateTime(date) <= dateTime(now())`)

  // pagination-related
  const offset = (page - 1) * perPage
  const limit = offset + perPage

  // join all the conditions together with &&
  let final = `${conditions[0]}(${conditions
    .slice(1)
    .join(" && ")})`

  if (isCount === true) {
    final += `])`
  } else {
    final += `]| order(${order} ${ascDesc})[${offset}...${limit}]`
  }

  return final

}

export function formUrlQuery({ params, key, value, keysToRemove }: UtilQueryURLProps) {

  // get the current URL
  const currentUrl = qs.parse(params)

  // keysToRemove as an array of keys not to include in the query
  if (keysToRemove) {

    keysToRemove.forEach((keyToRemove) => {
      delete currentUrl[keyToRemove]
    })

  } else if (key && value) {

    currentUrl[key] = value

  }

  // the new URL with all the relevant query strings
  return qs.stringifyUrl(
    { url: window.location.pathname, query: currentUrl },
    { skipNull: true }
  )

}