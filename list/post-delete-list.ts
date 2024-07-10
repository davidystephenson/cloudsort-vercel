import post from '@/post/post'
import { ListRequest } from './list-types'
import { Ok } from '@/respond/respond-types'

export default async function postDeleteList (props: {
  body: ListRequest
}): Promise<Ok> {
  return await post({
    body: props.body,
    url: '/api/list/delete'
  })
}
