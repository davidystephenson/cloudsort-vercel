import { createContext, useContext, useState, ChangeEvent } from 'react'
import { AuthFormContextValue } from '../types'
import { useRouter } from 'next/navigation'

export const AuthFormContext = createContext<AuthFormContextValue | undefined>(undefined)

export function useAuthFormContext (): AuthFormContextValue {
  const value = useContext(AuthFormContext)
  if (value == null) {
    throw new Error('useAuthFormContext must be used within AuthFormContext.Provider')
  }
  return value
}

export function AuthFormProvider (props: {
  children: React.ReactNode
  send: ({ email, password }: { email: string, password: string }) => Promise<unknown>
}): JSX.Element {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleEmailChange (event: ChangeEvent<HTMLInputElement>): void {
    setEmail(event.target.value)
  }
  function handlePasswordChange (event: ChangeEvent<HTMLInputElement>): void {
    setPassword(event.target.value)
  }
  async function send (): Promise<void> {
    await props.send({ email, password })
    router.refresh()
    router.push('/protected')
  }
  const value: AuthFormContextValue = {
    email,
    handleEmailChange,
    handlePasswordChange,
    password,
    send
  }
  return (
    <AuthFormContext.Provider value={value}>
      {props.children}
    </AuthFormContext.Provider>
  )
}
