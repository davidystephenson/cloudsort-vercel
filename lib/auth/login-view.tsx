'use client'

import AuthFormView from '../auth-form/auth-form-view'
import SubmitRequestView from '../request/submit-request-view'
import login from './login'

export default function LoginForm (): JSX.Element {
  return (
    <AuthFormView
      send={login}
    >
      <SubmitRequestView>
        Login
      </SubmitRequestView>
    </AuthFormView>
  )
}
