import { Db } from '@/prisma/prisma-types'
import { ListState } from './list-types'

export default async function createListState (props: {
  db: Db
  listId: number
}): Promise<ListState> {
  const list = await props.db.list.findUnique({
    where: { id: props.listId }
  })
  if (list == null) {
    throw new Error('List not found')
  }
  if (list.snapshot == null) {
    throw new Error('List has no snapshot')
  }
  if (typeof list.snapshot !== 'string') {
    throw new Error('List snapshot is not a string')
  }
  // TODO Police
  const listState = JSON.parse(list.snapshot)
  return listState
}
