import { List } from '@prisma/client'

export interface ListContextValue {
  deleteRow: () => Promise<void>
  row: List
}

export interface ListsContextValue {
  deleteRow: (props: { id: number }) => Promise<void>
  filterRows: (filterProps: { query: string }) => void
  filteredRows: List[]
  rows: List[]
}
