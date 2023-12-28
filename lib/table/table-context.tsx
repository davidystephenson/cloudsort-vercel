import { TableContextValue, TableItem } from './table-types'
import { contextCreator } from '../context-creator/context-creator'

function useValue (props: {
  columns: string[]
  filterRows: (props: { query: string }) => void
  rows: TableItem[]
}): TableContextValue {
  const value: TableContextValue = {
    columns: props.columns,
    filterRows: props.filterRows,
    rows: props.rows
  }
  return value
}

export const {
  useCreatedContext: useTable,
  ContextProvider: TableProvider
} = contextCreator({ useValue })
