'use client'

import { useRouter } from 'next/navigation'
import AuthFormView from '../auth-form/auth-form-view'
import SubmitRequestView from '../request/submit-request-view'
import register from './register'
import { Fields } from '../form/form-types'

export default function RegisterView (): JSX.Element {
  const router = useRouter()
  async function send (fields: Fields): Promise<void> {
    if (fields.email == null) {
      throw new Error('There is no email field')
    }
    if (fields.password == null) {
      throw new Error('There is no password field')
    }
    await register({
      email: fields.email.value,
      password: fields.password.value
    })
    router.refresh()
    router.push('/login')
  }
  return (
    <AuthFormView
      send={send}
    >
      <SubmitRequestView>
        Register
      </SubmitRequestView>
    </AuthFormView>
  )
}
