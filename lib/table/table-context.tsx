import { TableContextValue, TableItem } from './table-types'
import { contextCreator } from '../context-creator/context-creator'

function useValue (props: {
  columns: string[]
  filterRows: (props: { query: string | undefined }) => void
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
  CreatedProvider: TableProvider
} = contextCreator({ useValue })
