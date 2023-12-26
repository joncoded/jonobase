import { text } from "@/lib/app.config";
import { ListProps } from "@/lib/types";

const ListHead = ({count, query, kind}: ListProps) => {

  if (query && kind) {
    return (      
      <>{count} {count > 1 ? text['results'] : text['result']} : <strong>{query} ({kind})</strong></>
    )
  }

  if (query) {
    return (      
      <>{count} {count > 1 ? text['results for query'] : text['result for query']} : <strong>{query}</strong></>
    )
  }

  if (kind) {
    return (      
      <>{count} {count > 1 ? text['results for kind'] : text['result for kind']} : <strong>{kind}</strong></>
    )
  }

  return (    
    <>{count} {count > 1 ? text['results'] : text['result']}</>    
  )

}

export default ListHead
