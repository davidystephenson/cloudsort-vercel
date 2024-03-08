'use client'

import { useRouter } from 'next/navigation'
import AuthFormView from '../auth-form/auth-form-view'
import { Fields } from '../form/form-types'
import SubmitRequestView from '../request/submit-request-view'
import login from './login'
import guardFields from '../guard/guard-fields'

export default function LoginForm (): JSX.Element {
  const router = useRouter()
  async function send (fields: Fields): Promise<void> {
    const values = guardFields({
      fields,
      names: ['email', 'password']
    })
    await login({
      email: values.email,
      password: values.password
    })
    router.refresh()
    router.push('/protected')
  }
  return (
    <AuthFormView
      send={send}
    >
      <SubmitRequestView>
        Login
      </SubmitRequestView>
    </AuthFormView>
  )
}
