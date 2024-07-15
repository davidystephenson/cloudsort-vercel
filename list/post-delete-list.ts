import post from '@/post/post'
import { ListRequest } from './list-types'
import { OkTrue } from '@/ok/ok-types'
import guardOkTrue from '@/ok/guard-ok-true'

export default async function postDeleteList (props: {
  body: ListRequest
  label: string
}): Promise<OkTrue> {
  return await post({
    body: props.body,
    guard: guardOkTrue,
    label: props.label,
    url: '/api/list/delete'
  })
}
