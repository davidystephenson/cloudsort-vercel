export type TableItem = Record<string, string | number>

export interface TableContextValue {
  columns: string[]
  filterRows: (props: { query: string | undefined }) => void
  rows: TableItem[]
}
