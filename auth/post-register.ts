import { AuthRequest } from './auth-types'
import post from '@/post/post'

export default async function postRegister (props: {
  body: AuthRequest
  label: string
}): Promise<void> {
  return await post({
    body: props.body,
    guard: () => {},
    label: props.label,
    url: '/api/auth/register'
  })
}
