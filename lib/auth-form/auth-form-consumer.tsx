'use client'

import RequestFormView from '../request/request-form-view'
import AuthFormFieldsView from './auth-form-fields-view'
import { useAuthFormContext } from './auth-form-context'
import { Spacer } from '@nextui-org/react'

export default function AuthFormConsumer (props: {
  children: React.ReactNode
}): JSX.Element {
  const authForm = useAuthFormContext()

  return (
    <RequestFormView send={authForm.send} endless>
      <AuthFormFieldsView />
      <Spacer y={8} />
      {props.children}
    </RequestFormView>
  )
}
