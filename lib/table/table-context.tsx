import { TableContextValue, TableItem } from './table-types'
import { createContext, useContext, ReactNode, useState } from 'react'

const tableContext = createContext<TableContextValue | undefined>(undefined)

export function useTable (): TableContextValue {
  const value = useContext(tableContext)
  if (value == null) {
    throw new Error('useTableContext must be used within a TableProvider')
  }
  return value
}

export function TableProvider (props: {
  children: ReactNode
  columns: string[]
  rows: TableItem[]
}): JSX.Element {
  const [filteredRows, setFilteredRows] = useState<TableItem[]>(props.rows)
  function filter (query: string): void {
    const filteredRows = props.rows.filter((row) => {
      const values = Object.values(row)
      const includes = values.some((value) => {
        const string = String(value)
        const includes = string.includes(query)
        return includes
      })
      return includes
    })
    setFilteredRows(filteredRows)
  }
  const value: TableContextValue = {
    columns: props.columns,
    filter,
    filteredRows,
    rows: props.rows
  }
  return (
    <tableContext.Provider value={value}>
      {props.children}
    </tableContext.Provider>
  )
}
