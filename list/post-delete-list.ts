import post from '@/post/post'
import { ListWhere } from './list-types'
import { OkTrue } from '@/ok/ok-types'
import guardOkTrue from '@/ok/guard-ok-true'

export default async function postDeleteList (props: {
  body: ListWhere
  label: string
}): Promise<OkTrue> {
  return await post({
    body: props.body,
    guard: guardOkTrue,
    label: props.label,
    url: '/api/list/delete'
  })
}
