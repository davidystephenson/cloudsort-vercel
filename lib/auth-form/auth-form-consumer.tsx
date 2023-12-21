'use client'

import RequestFormView from '../request/request-form-view'
import AuthFieldsView from './auth-fields-view'
import { useAuthFormContext } from './auth-form-context'

export default function AuthFormConsumer (props: {
  children: React.ReactNode
}): JSX.Element {
  const authForm = useAuthFormContext()

  return (
    <RequestFormView send={authForm.send}>
      <AuthFieldsView />
      {props.children}
    </RequestFormView>
  )
}
