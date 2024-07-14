import { AuthBody } from './auth-types'
import post from '@/post/post'

export default async function postRegister (props: {
  body: AuthBody
}): Promise<void> {
  return await post({
    payload: props.body,
    url: '/api/auth/register'
  })
}
