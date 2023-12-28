import { ListContextValue } from './list-types'
import { List } from '@prisma/client'
import { contextCreator } from '../context-creator/context-creator'

function useValue (props: {
  row: List
}): ListContextValue {
  const value: ListContextValue = {
    row: props.row
  }
  return value
}

export const {
  useCreatedContext: useList,
  ContextProvider: ListProvider
} = contextCreator({ useValue })
