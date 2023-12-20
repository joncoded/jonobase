import { text } from "@/lib/app.config";
import { ListProps } from "@/lib/types";

const ListHead = ({query, kind}: ListProps) => {
  if (query && kind) {
    return (
      <h2 className="text-3xl">
        {text['results']} <strong>{query}</strong> (<strong>{kind}</strong>)
      </h2>
    )
  }

  if (query) {
    return (
      <h2 className="text-3xl">
         {text['results_query']} : <strong>{query}</strong>
      </h2>
    )
  }

  if (kind) {
    return (
      <h2 className="text-3xl">
        {text['results_kind']} : <strong>{kind}</strong>
      </h2>
    )
  }

  return (
    <></>
  )

}

export default ListHead
