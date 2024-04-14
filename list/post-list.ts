import { List } from '@prisma/client'
import { PostListBody } from './list-types'
import post from '@/post/post'

export default async function postList (props: {
  body: PostListBody
}): Promise<List> {
  return await post({
    body: props.body,
    url: '/api/list'
  })
}
