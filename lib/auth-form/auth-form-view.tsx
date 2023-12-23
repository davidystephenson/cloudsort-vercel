'use client'
import { AuthFormProvider } from './auth-form-context'
import AuthFormConsumer from './auth-form-consumer'

export default function AuthFormView (props: {
  children: React.ReactNode
  send: (props: { email: string, password: string }) => Promise<unknown>
}): JSX.Element {
  return (
    <AuthFormProvider send={props.send}>
      <AuthFormConsumer>
        {props.children}
      </AuthFormConsumer>
    </AuthFormProvider>
  )
}
