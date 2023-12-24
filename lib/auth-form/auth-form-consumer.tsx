'use client'

import AuthFormFieldsView from './auth-form-fields-view'
import { Spacer } from '@nextui-org/react'

export default function AuthFormConsumer (props: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <>
      <AuthFormFieldsView />
      <Spacer y={8} />
      {props.children}
    </>
  )
}
