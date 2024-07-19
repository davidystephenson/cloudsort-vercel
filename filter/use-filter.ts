import { useState } from 'react'
import { Filter } from './filter-types'

export default function useFilter <Row> (props: {
  filter: (props: { row: Row, query: string }) => boolean
  rows: Row[]
}): Filter<Row> {
  const [query, setQuery] = useState<string>()
  const filtered = props.rows.filter((row) => {
    if (query == null) {
      return true
    }
    const includes = props.filter({ row, query })
    return includes
  })
  function filter (props: {
    query: string | undefined
  }): void {
    setQuery(props.query)
  }

  return {
    sift: filter,
    filtered
  }
}
