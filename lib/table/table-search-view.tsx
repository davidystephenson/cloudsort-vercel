import { ChangeEvent, useRef, useState } from 'react'
import ThemeInputView from '../theme/theme-input-view'
import { useTable } from './table-context'
import ThemeButtonView from '../theme/theme-button-view'
import { MdClear } from 'react-icons/md'
import ThemeIconView from '../theme/theme-icon-view'
import { useHotkeys } from 'react-hotkeys-hook'

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
  const end = queried
    ? (
      <ThemeButtonView
        onClick={handleClear}
        isIconOnly
        variant='light'
      >
        <ThemeIconView Icon={MdClear} />
      </ThemeButtonView>
      )
    : <></>

  return (
    <>
      <ThemeInputView
        endContent={end}
        label='Search'
        onChange={handleQueryChange}
        value={query}
        ref={inputRef}
      />
    </>
  )
}
