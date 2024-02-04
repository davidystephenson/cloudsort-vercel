import { ChangeEvent, KeyboardEvent, RefObject } from 'react'

export interface Identity {
  id: number
}

export interface TableContextValue {
  autoFocus: boolean
  clearQuery: () => void
  columns: string[]
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
  handleQueryChange: (event: ChangeEvent<HTMLInputElement>) => void
  inputRef: RefObject<HTMLInputElement>
  filterRows: (props: { query: string | undefined }) => void
  query: string
}
