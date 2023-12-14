
interface Props {
  query: string;
  category: string;
}

const ListHead = ({query, category}: Props) => {
  if (query && category) {
    return (
      <h2 className="text-3xl">
        results for <strong>{query}</strong> in <strong>{category}</strong>
      </h2>
    )
  }

  if (query) {
    return (
      <h2 className="text-3xl">
        results for query: <strong>{query}</strong>
      </h2>
    )
  }

  if (category) {
    return (
      <h2 className="text-3xl">
        results for category: <strong>{category}</strong>
      </h2>
    )
  }

  return (
    <></>
  )

}

export default ListHead
