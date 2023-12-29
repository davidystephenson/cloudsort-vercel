import { ListContextValue } from './list-types'
import { List } from '@prisma/client'
import { contextCreator } from '../context-creator/context-creator'
import { useLists } from './lists-context'

function useValue (props: {
  row: List
}): ListContextValue {
  const lists = useLists()
  async function deleteRow (): Promise<void> {
    await lists.deleteRow({ id: props.row.id })
  }
  const value: ListContextValue = {
    deleteRow,
    row: props.row
  }
  return value
}

export const {
  useCreatedContext: useList,
  ContextProvider: ListProvider
} = contextCreator({ useValue })
