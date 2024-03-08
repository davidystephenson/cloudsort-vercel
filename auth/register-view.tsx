'use client'

import { useRouter } from 'next/navigation'
import AuthFormView from '../auth-form/auth-form-view'
import SubmitRequestView from '../request/submit-request-view'
import register from './register'
import { Fields } from '../form/form-types'
import guardFields from '../guard/guard-fields'

export default function RegisterView (): JSX.Element {
  const router = useRouter()
  async function send (fields: Fields): Promise<void> {
    const values = guardFields({
      fields,
      names: ['email', 'password']
    })
    await register({
      email: values.email,
      password: values.password
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
