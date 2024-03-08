'use client'

import { Spacer } from '@chakra-ui/react'
import AuthFormFieldsView from './auth-form-fields-view'

export default function AuthFormConsumer (props: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <>
      <AuthFormFieldsView />
      <Spacer mb={8} />
      {props.children}
    </>
  )
}
