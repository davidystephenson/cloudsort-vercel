import { ApiError } from 'next/dist/server/api-utils'
import getRelatedList from './get-related-list'
import { RelatedList } from './list-types'

export default async function guardRelatedList (props: {
  listId: number
}): Promise<RelatedList> {
  const list = await getRelatedList({
    listId: props.listId
  })
  if (list == null) {
    throw new ApiError(404, 'There is no list')
  }
  return list
}
