'use client'

import { useRouter } from 'next/navigation'
import AuthFormView from '../auth-form/auth-form-view'
import { Fields } from '../form/form-types'
import SubmitRequestView from '../request/submit-request-view'
import login from './login'

export default function LoginForm (): JSX.Element {
  const router = useRouter()
  async function send (fields: Fields): Promise<void> {
    if (fields.email == null) {
      throw new Error('There is no email field')
    }
    if (fields.password == null) {
      throw new Error('There is no password field')
    }
    await login({
      email: fields.email.value,
      password: fields.password.value
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
