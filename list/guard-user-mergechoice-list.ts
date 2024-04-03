import { ApiError } from 'next/dist/server/api-utils'
import { MergechoiceList } from './list-types'
import guardRelatedList from './guard-related-list'
import getMergechoiceList from './get-mergechoice-list'

export default async function guardUserMergechoiceList (props: {
  listId: number
  userId: number
}): Promise<MergechoiceList> {
  const list = await guardRelatedList({
    listId: props.listId
  })
  if (list.userId !== props.userId) {
    throw new ApiError(403, 'This is not your list')
  }
  const mergechoiceList = await getMergechoiceList({
    list
  })
  return mergechoiceList
}
