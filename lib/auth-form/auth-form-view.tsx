'use client'
import { AuthFormProvider } from './auth-form-context'
import AuthFormConsumer from './auth-form-consumer'

export default function AuthFormView ({
  children,
  send
}: {
  children: React.ReactNode
  send: ({ email, password }: { email: string, password: string }) => Promise<unknown>
}): JSX.Element {
  return (
    <AuthFormProvider send={send}>
      <AuthFormConsumer>
        {children}
      </AuthFormConsumer>
    </AuthFormProvider>
  )
}
