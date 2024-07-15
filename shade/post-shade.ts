import guardOkTrue from '@/ok/guard-ok-true'
import { OkTrue } from '@/ok/ok-types'
import post from '@/post/post'

export default async function postShade (props: {
  label: string
  shade: string
}): Promise<OkTrue> {
  const body = { shade: props.shade }
  const ok = await post({
    body,
    label: props.label,
    guard: guardOkTrue,
    url: '/api/shade'
  })
  document.cookie = 'newShade=none;'
  return ok
}
