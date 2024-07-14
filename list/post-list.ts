import { List } from '@prisma/client'
import { CreateListRequest } from './list-types'
import post from '@/post/post'
import guardList from './guard-list'

export default async function postList (props: {
  body: CreateListRequest
  label: string
}): Promise<List> {
  return await post({
    body: props.body,
    guard: guardList,
    label: props.label,
    url: '/api/list'
  })
}
