import { List } from '@prisma/client'
import { ListsContextValue } from './list-types'
import { contextCreator } from '../context-creator/context-creator'
import { useState } from 'react'

function useValue (props: {
  rows: List[]
}): ListsContextValue {
  const [filteredRows, setFilteredRows] = useState<List[]>(props.rows)
  function filterRows (filterProps: {
    query: string
  }): void {
    const filteredRows = props.rows.filter((row) => {
      const values = Object.values(row)
      const includes = values.some((value) => {
        const string = String(value)
        const includes = string.includes(filterProps.query)
        return includes
      })
      return includes
    })
    setFilteredRows(filteredRows)
  }
  const value: ListsContextValue = {
    filterRows,
    filteredRows,
    rows: props.rows
  }
  return value
}

export const {
  useCreatedContext: useLists,
  ContextProvider: ListsProvider
} = contextCreator({ useValue })
