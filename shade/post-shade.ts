import post from '@/post/post'
import { Ok } from '@/respond/respond-types'
import { PostShadeBody } from './shade-types'

export default async function postShade (props: {
  shade: string
}): Promise<Ok> {
  const body = { shade: props.shade }
  const ok = await post<PostShadeBody, Ok>({
    payload: body,
    url: '/api/shade'
  })
  document.cookie = 'newShade=none;'
  return ok
}
