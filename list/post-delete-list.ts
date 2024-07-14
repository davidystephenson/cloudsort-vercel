import post from '@/post/post'
import { ListRequest } from './list-types'
import { Ok } from '@/ok/ok-types'
import guardOk from '@/ok/guard-ok'

export default async function postDeleteList (props: {
  body: ListRequest
  label: string
}): Promise<Ok> {
  return await post({
    body: props.body,
    guard: guardOk,
    label: props.label,
    url: '/api/list/delete'
  })
}
