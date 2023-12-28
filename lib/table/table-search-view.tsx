import { ChangeEvent, useState } from 'react'
import ThemeInputView from '../theme/theme-input-view'
import { useTable } from './table-context'

export default function TableSearchView (): JSX.Element {
  const table = useTable()
  const [query, setQuery] = useState('')
  function handleQueryChange (event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value)
    table.filter(event.target.value)
  }
  return (
    <>
      <ThemeInputView
        onChange={handleQueryChange}
        value={query}
        label='Search'
      />
    </>
  )
}
