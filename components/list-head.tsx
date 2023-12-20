import { text } from "@/lib/app.config";
import { ListProps } from "@/lib/types";

const ListHead = ({query, category}: ListProps) => {
  if (query && category) {
    return (
      <h2 className="text-3xl">
        {text['results']} <strong>{query}</strong> (<strong>{category}</strong>)
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

  if (category) {
    return (
      <h2 className="text-3xl">
        {text['results_category']} : <strong>{category}</strong>
      </h2>
    )
  }

  return (
    <></>
  )

}

export default ListHead
