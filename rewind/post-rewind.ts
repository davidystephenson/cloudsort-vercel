import guardOkTrue from '@/ok/guard-ok-true'
import { OkTrue } from '@/ok/ok-types'
import post from '@/post/post'

export default async function postRewind (props: {
  episodeMergechoiceId: number
  label: string
  lastMergechoiceId: number
  listId: number
}): Promise<OkTrue> {
  const response = await post({
    body: {
      episodeMergechoiceId: props.episodeMergechoiceId,
      lastMergechoiceId: props.lastMergechoiceId,
      listId: props.listId
    },
    guard: guardOkTrue,
    label: props.label,
    url: '/api/list/rewind'
  })
  return response
}
