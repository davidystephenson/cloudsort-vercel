import guardOkTrue from '@/ok/guard-ok-true'
import { OkTrue } from '@/ok/ok-types'
import post from '@/post/post'
import { RewindRequest } from './rewindTypes'

export default async function postRewind (props: {
  label: string
  request: RewindRequest
}): Promise<OkTrue> {
  const response = await post({
    request: props.request,
    guard: guardOkTrue,
    label: props.label,
    url: '/api/list/rewind'
  })
  return response
}
