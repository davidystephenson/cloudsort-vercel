import { List } from '@prisma/client'
import { CreateListRequest } from './list-types'
import post from '@/post/post'

export default async function postList (props: {
  body: CreateListRequest
}): Promise<List> {
  return await post({
    body: props.body,
    url: '/api/list'
  })
}
