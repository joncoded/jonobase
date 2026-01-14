
/*
jonobase by @joncoded (aka @jonchius)
/sanity/utils.ts
query building helper methods
*/


import qs from "query-string"
import { UtilQueryBuildingProps, UtilQueryURLProps } from "@/sanity/myprops"

// used to build long queries with many components, some of which may or may not appear
export function buildQuery(params: UtilQueryBuildingProps) {

  /* get all the variables based on URL params and query strings (or use defaults listed below) */
  const {
    domain = '',
    isCount = false,
    query = '*',
    join = '', 
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

  // by query (keyword)
  if (query)
    conditions.push(`
      [title, subtitle, content[].children[].text, extra[].children[].text, nooks] match '*${query.toLowerCase()}*'
    `)

  // by join
  if (join !== '') {
    conditions.push(`lower(join) == '${join.toLowerCase()}'`)
  }  

  // by kind (category)
  if (kind !== '') {
    conditions.push(`lower(kind) == '${kind.toLowerCase()}'`)
  }

  // by nook (tag)
  if (nook) {
    conditions.push(`lower('${nook}') in nooks`)
  }

  // by base
  conditions.push(`"${domain}" in base[]->.domain`)

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