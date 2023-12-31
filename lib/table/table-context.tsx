import { TableContextValue } from './table-types'
import { contextCreator } from '../context-creator/context-creator'

function useValue (props: {
  columns: string[]
  filterRows: (props: { query: string | undefined }) => void
}): TableContextValue {
  const value: TableContextValue = {
    columns: props.columns,
    filterRows: props.filterRows
  }
  return value
}

export const {
  useCreatedContext: useTable,
  CreatedProvider: TableProvider
} = contextCreator({ name: 'table', useValue })
