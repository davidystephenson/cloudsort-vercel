import { ListContextValue } from './list-types'
import { List } from '@prisma/client'
import { contextCreator } from '../context-creator/context-creator'
import { useLists } from './lists-context'

function useValue (props: {
  row: List
}): ListContextValue {
  const lists = useLists()
  async function _delete (): Promise<void> {
    await lists.delete({ id: props.row.id })
  }
  const value: ListContextValue = {
    delete: _delete,
    row: props.row
  }
  return value
}

export const {
  useCreatedContext: useList,
  CreatedProvider: ListProvider
} = contextCreator({ useValue })
