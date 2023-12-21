'use client'

import { useRouter } from 'next/navigation'
import AuthFormView from '../auth-form/auth-form-view'
import SubmitRequestView from '../request/submit-request-view'
import login from './login'

export default function LoginFormView (): JSX.Element {
  const router = useRouter()

  async function sendLogin ({ email, password }: {
    email: string
    password: string
  }): Promise<void> {
    await login({ email, password })
    console.log('login')
    router.refresh()
    router.push('/protected')
  }

  return (
    <AuthFormView
      send={sendLogin}
    >
      <SubmitRequestView>
        Login
      </SubmitRequestView>
    </AuthFormView>
  )
}
