import { createContext, useContext, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AuthFormContextValue } from './auth-form-types'

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
  send: (props: { email: string, password: string }) => Promise<unknown>
}): JSX.Element {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  function handleChange (): void {
    if (emailRef.current != null) {
      setEmail(emailRef.current.value)
    }
    if (passwordRef.current != null) {
      setPassword(passwordRef.current.value)
    }
  }
  async function send (): Promise<void> {
    await props.send({ email, password })
    router.refresh()
    router.push('/protected')
  }
  const value: AuthFormContextValue = {
    email,
    emailRef,
    handleChange,
    password,
    passwordRef,
    send
  }
  return (
    <AuthFormContext.Provider value={value}>
      {props.children}
    </AuthFormContext.Provider>
  )
}
