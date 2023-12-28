export type TableItem = Record<string, string | number>

export interface TableContextValue {
  columns: string[]
  filter: (query: string) => void
  filteredRows: TableItem[]
  rows: TableItem[]
}
