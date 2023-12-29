import { List } from '@prisma/client'

export interface ListContextValue {
  delete: () => Promise<void>
  row: List
}

export interface ListsContextValue {
  create: (props: { name: string }) => Promise<void>
  delete: (props: { id: number }) => Promise<void>
  filterRows: (filterProps: { query: string }) => void
  filteredRows: List[]
  rows: List[]
}
