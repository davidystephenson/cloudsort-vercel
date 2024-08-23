import { AuthBody } from './auth-types'
import post from '@/post/post'

export default async function postRegister (props: {
  body: AuthBody
  label: string
}): Promise<void> {
  return await post({
    request: props.body,
    guard: () => {},
    label: props.label,
    url: '/api/auth/register'
  })
}
