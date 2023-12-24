import { createContext, useContext } from 'react'
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
  async function send (): Promise<void> {
    console.log('send')
    await props.send({
      email: '1@fake',
      password: 'fake'
    })
    router.refresh()
    router.push('/protected')
  }
  const value: AuthFormContextValue = {
    send
  }
  return (
    <AuthFormContext.Provider value={value}>
      {props.children}
    </AuthFormContext.Provider>
  )
}
