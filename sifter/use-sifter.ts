import { useCallback, useMemo, useState } from 'react'
import { Sifter } from './sifter-types'

export default function useSifter <Row> (props: {
  debug?: boolean
  sift: (props: { row: Row, query: string }) => boolean
  rows: Row[]
}): Sifter<Row> {
  const [query, setQuery] = useState<string>()
  const { debug, rows, sift: siftProp } = props
  console.log('rows', rows)
  const sifted = useMemo(() => {
    const sifted = rows.filter((row) => {
      if (debug === true) {
        console.debug('row', row)
      }
      if (query == null) {
        if (debug === true) {
          console.debug('queryless')
        }
        return true
      }
      const includes = siftProp({ row, query })
      return includes
    })
    if (debug === true) {
      console.log('sifted inside', sifted)
    }
    return sifted
  }, [debug, query, rows, siftProp])
  if (props.debug === true) {
    console.log('sifted outside', sifted)
  }
  const reset = useCallback(() => {
    setQuery(undefined)
  }, [])
  const sift = useCallback((props: {
    query: string | undefined
  }) => {
    setQuery(props.query)
  }, [])
  const sifter = {
    query,
    reset,
    sift,
    sifted
  }
  return sifter
}
