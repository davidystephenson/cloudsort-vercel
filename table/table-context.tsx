import contextCreator from 'context-creator'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

export const {
  useContext: useTable,
  Provider: TableProvider
} = contextCreator({
  name: 'table',
  useValue: (props: {
    columns: string[]
    filter: (props: { query: string | undefined }) => void
  }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [autoFocus, setAutoFocus] = useState(true)
    const [query, setQuery] = useState('')
    useHotkeys('ctrl+f', (event) => {
      event?.preventDefault()
      inputRef.current?.focus()
    })
    useEffect(() => {
      inputRef.current?.blur()
      setAutoFocus(false)
    }, [])
    function clearQuery (): void {
      setQuery('')
      props.filter({ query: undefined })
    }
    function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>): void {
      if (event.key === 'Escape') {
        setAutoFocus(false)
        inputRef.current?.blur()
      }
    }
    function handleQueryChange (event: ChangeEvent<HTMLInputElement>): void {
      const lower = event.target.value.toLowerCase()
      setQuery(lower)
      props.filter({ query: event.target.value })
      setAutoFocus(true)
    }
    const value = {
      autoFocus,
      columns: props.columns,
      inputRef,
      filterRows: props.filter,
      clearQuery,
      handleKeyDown,
      handleQueryChange,
      query
    }
    return value
  }
})
