import post from '@/post/post'
import { DeleteListRequest } from './list-types'
import { Ok } from '@/respond/respond-types'

export default async function postDeleteList (props: {
  body: DeleteListRequest
}): Promise<Ok> {
  return await post({
    body: props.body,
    url: '/api/list/delete'
  })
}
