import post from '@/post/post'
import { PostDeleteListBody } from './list-types'
import { Ok } from '@/respond/respond-types'

export default async function postDeleteList (props: {
  body: PostDeleteListBody
}): Promise<Ok> {
  return await post({
    body: props.body,
    url: '/api/list/delete'
  })
}
