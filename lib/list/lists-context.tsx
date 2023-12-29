import { List } from '@prisma/client'
import { ListsContextValue } from './list-types'
import { contextCreator } from '../context-creator/context-creator'
import { useEffect, useState } from 'react'
import deleteList from './delete-list'

function useValue (props: {
  rows: List[]
}): ListsContextValue {
  const [rows, setRows] = useState(props.rows)
  const [query, setQuery] = useState<string>()
  const [filteredRows, setFilteredRows] = useState<List[]>(props.rows)
  useEffect(() => {
    setRows(props.rows)
  }, [props.rows])
  useEffect(() => {
    if (query == null) {
      setFilteredRows(rows)
      return
    }
    const filteredRows = rows.filter((row) => {
      const values = Object.values(row)
      const includes = values.some((value) => {
        const string = String(value)
        const includes = string.includes(query)
        return includes
      })
      return includes
    })
    setFilteredRows(filteredRows)
  }, [rows, query])
  async function deleteRow (props: {
    id: number
  }): Promise<void> {
    await deleteList({ id: props.id })
    setRows((rows) => {
      const newRows = rows.filter((row) => {
        const keep = row.id !== props.id
        return keep
      })
      return newRows
    })
  }
  function filterRows (props: {
    query: string
  }): void {
    setQuery(props.query)
  }
  const value: ListsContextValue = {
    deleteRow,
    filterRows,
    filteredRows,
    rows
  }
  return value
}

export const {
  useCreatedContext: useLists,
  ContextProvider: ListsProvider
} = contextCreator({ useValue })
