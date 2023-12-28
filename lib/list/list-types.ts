import { List } from '@prisma/client'

export interface ListContextValue {
  row: List
}

export interface ListsContextValue {
  filterRows: (filterProps: { query: string }) => void
  filteredRows: List[]
  rows: List[]
}
