import { TableContextValue } from './table-types'
import { contextCreator } from '../context-creator/context-creator'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

function useValue (props: {
  columns: string[]
  filterRows: (props: { query: string | undefined }) => void
}): TableContextValue {
  const inputRef = useRef<HTMLInputElement>(null)
  const [autoFocus, setAutoFocus] = useState(true)
  const [query, setQuery] = useState('')
  useHotkeys('ctrl+f', () => {
    event?.preventDefault()
    inputRef.current?.focus()
  })
  useEffect(() => {
    inputRef.current?.blur()
    setAutoFocus(false)
  }, [])
  function clearQuery (): void {
    setQuery('')
    props.filterRows({ query: undefined })
  }
  function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Escape') {
      setAutoFocus(false)
      inputRef.current?.blur()
    }
  }
  function handleQueryChange (event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value)
    props.filterRows({ query: event.target.value })
    setAutoFocus(true)
  }
  const value: TableContextValue = {
    autoFocus,
    columns: props.columns,
    inputRef,
    filterRows: props.filterRows,
    clearQuery,
    handleKeyDown,
    handleQueryChange,
    query
  }
  return value
}

export const {
  useCreatedContext: useTable,
  CreatedProvider: TableProvider
} = contextCreator({ name: 'table', useValue })
