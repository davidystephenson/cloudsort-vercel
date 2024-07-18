import { useState, useEffect } from 'react'
import { Filter } from './filter-types'

export default function useFilter <Row> (props: {
  filter: (props: { row: Row, query: string }) => boolean
  rows: Row[]
}): Filter<Row> {
  const [query, setQuery] = useState<string>()
  const [filtered, setFiltered] = useState<Row[]>(props.rows)
  useEffect(() => {
    if (query == null) {
      setFiltered(props.rows)
      return
    }
    const filteredRows = props.rows.filter((row) => {
      const includes = props.filter({ row, query })
      return includes
    })
    setFiltered(filteredRows)
  }, [props.rows, query])
  function sift (props: {
    query: string | undefined
  }): void {
    setQuery(props.query)
  }
  const filter = {
    sift,
    filtered
  }
  return filter
}
