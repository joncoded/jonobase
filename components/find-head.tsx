/*
jonanity by @joncoded
/app/components/find-head.tsx
search results counter
*/


import { text } from "@/lib/app.config";
import { FindHeadProps } from "@/lib/types";

const FindHead = ({count, query, kind}: FindHeadProps) => {

  if (query && kind) {
    return (      
      <>{count} {count == 1 ? text['result'] : text['results']} : <strong>{query} ({kind})</strong></>
    )
  }

  if (query) {
    return (      
      <>{count} {count == 1 ? text['result for query'] : text['results for query']} : <strong>{query}</strong></>
    )
  }

  if (kind) {
    return (      
      <>{count} {count == 1 ? text['result for kind'] : text['results for kind']} : <strong>{kind}</strong></>
    )
  }

  return (    
    <>{count} {count > 1 ? text['results'] : text['result']}</>    
  )

}

export default FindHead
