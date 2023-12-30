import { useState, useEffect } from 'react'
import { Filter } from './filter-types'

export default function useFilter <Item> (props: {
  filter: (props: { row: Item, query: string }) => boolean
  rows: Item[]
}): Filter<Item> {
  const [query, setQuery] = useState<string>()
  const [filtered, setFiltered] = useState<Item[]>(props.rows)
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
  function filter (props: {
    query: string | undefined
  }): void {
    setQuery(props.query)
  }

  return {
    filter,
    filtered
  }
}
