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
    filterRows: (props: { query: string | undefined }) => void
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
    const queried = query.length > 0
    function clearQuery (): void {
      setQuery('')
      props.filterRows({ query: undefined })
    }
    function handleKeyDown (event: React.KeyboardEvent<HTMLInputElement>): void {
      if (event.key === 'Escape') {
        setAutoFocus(false)
        clearQuery()
        inputRef.current?.blur()
      }
    }
    function handleQueryChange (event: ChangeEvent<HTMLInputElement>): void {
      const lower = event.target.value.toLowerCase()
      setQuery(lower)
      props.filterRows({ query: event.target.value })
      setAutoFocus(true)
    }
    function handleBlur (): void {
      setAutoFocus(false)
    }
    const value = {
      autoFocus,
      columns: props.columns,
      inputRef,
      filterRows: props.filterRows,
      clearQuery,
      handleKeyDown,
      handleQueryChange,
      queried,
      query,
      handleBlur
    }
    return value
  }
})
