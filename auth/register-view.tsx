'use client'

import { useRouter } from 'next/navigation'
import AuthFormView from '../auth-form/auth-form-view'
import SubmitRequestView from '../request/submit-request-view'
import postRegister from './post-register'
import guardFields from '../guard/guard-fields'

export default function RegisterView (): JSX.Element {
  const router = useRouter()
  async function send (props: {
    values: Record<string, string>
  }): Promise<void> {
    const values = guardFields({
      names: ['email', 'password'],
      values: props.values
    })
    const body = {
      email: values.email,
      password: values.password
    }
    await postRegister({ body, label: 'RegisterView' })
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
