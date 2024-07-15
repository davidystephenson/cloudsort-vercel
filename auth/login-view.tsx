'use client'

import { useRouter } from 'next/navigation'
import AuthFormView from '../auth-form/auth-form-view'
import SubmitRequestView from '../request/submit-request-view'
import login from './login'
import guardFields from '../fashion-police/guard-fields'

export default function LoginForm (): JSX.Element {
  const router = useRouter()
  async function send (props: {
    values: Record<string, string>
  }): Promise<void> {
    const values = guardFields({
      names: ['email', 'password'],
      values: props.values
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
