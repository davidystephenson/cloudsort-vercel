export interface Identity {
  id: number
}

export interface TableContextValue {
  columns: string[]
  filterRows: (props: { query: string | undefined }) => void
}
