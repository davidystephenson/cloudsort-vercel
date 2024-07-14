import guardOk from '@/ok/guard-ok'
import { Ok } from '@/ok/ok-types'
import post from '@/post/post'

export default async function postShade (props: {
  label: string
  shade: string
}): Promise<Ok> {
  const body = { shade: props.shade }
  const ok = await post({
    body,
    label: props.label,
    guard: guardOk,
    url: '/api/shade'
  })
  document.cookie = 'newShade=none;'
  return ok
}
