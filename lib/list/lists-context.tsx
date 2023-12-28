import { List } from '@prisma/client'
import { ListsContextValue } from './list-types'
import { createContext, useContext, ReactNode } from 'react'

const listsContext = createContext<ListsContextValue | undefined>(undefined)

export function useLists (): ListsContextValue {
  const value = useContext(listsContext)
  if (value == null) {
    throw new Error('useListsContext must be used within a ListsProvider')
  }
  return value
}

export function ListsProvider (props: {
  children: ReactNode
  rows: List[]
}): JSX.Element {
  const value: ListsContextValue = {
    rows: props.rows
  }

  return (
    <listsContext.Provider value={value}>
      {props.children}
    </listsContext.Provider>
  )
}
