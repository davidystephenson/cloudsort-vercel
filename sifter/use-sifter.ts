import { useState } from 'react'
import { Sifter } from './sifter-types'

export default function useSifter <Row> (props: {
  sift: (props: { row: Row, query: string }) => boolean
  rows: Row[]
}): Sifter<Row> {
  const [query, setQuery] = useState<string>()
  const filtered = props.rows.filter((row) => {
    if (query == null) {
      return true
    }
    const includes = props.sift({ row, query })
    return includes
  })
  function filter (props: {
    query: string | undefined
  }): void {
    setQuery(props.query)
  }

  return {
    sift: filter,
    sifted: filtered
  }
}
