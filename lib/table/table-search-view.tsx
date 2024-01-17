import { ChangeEvent, useRef, useState } from 'react'
import ThemeInputView from '../theme/theme-input-view'
import { useTable } from './table-context'
import { MdClear } from 'react-icons/md'
import { useHotkeys } from 'react-hotkeys-hook'
import ThemeIconButtonView from '../theme/theme-icon-button-view'

export default function TableSearchView (): JSX.Element {
  const table = useTable()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useHotkeys('ctrl+f', () => {
    event?.preventDefault()
    inputRef.current?.focus()
  })
  function handleQueryChange (event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value)
    table.filterRows({ query: event.target.value })
  }
  function handleClear (): void {
    setQuery('')
    table.filterRows({ query: undefined })
  }
  const queried = query !== ''
  const end = queried && (
    <ThemeIconButtonView
      aria-label='Clear search'
      onClick={handleClear}
      variant='light'
      icon={<MdClear />}
    />
  )

  return (
    <>
      <ThemeInputView
        rightElement={end}
        label='Search'
        onChange={handleQueryChange}
        value={query}
        ref={inputRef}
      />
    </>
  )
}
