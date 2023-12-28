export type TableItem = Record<string, string | number>

export interface TableContextValue {
  columns: string[]
  filterRows: (props: { query: string }) => void
  rows: TableItem[]
}
