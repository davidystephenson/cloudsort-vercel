'use client'

import AuthFormView from '../auth-form/auth-form-view'
import SubmitRequestView from '../request/submit-request-view'
import register from './register'

export default function RegisterView (): JSX.Element {
  return (
    <AuthFormView
      send={register}
    >
      <SubmitRequestView>
        Register
      </SubmitRequestView>
    </AuthFormView>
  )
}
