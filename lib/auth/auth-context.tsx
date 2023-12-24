'use client'

import { createContext, useContext, ReactNode } from 'react'
import { AuthContextValue } from './auth-types'
import { Session } from 'next-auth'

const authContext = createContext<AuthContextValue | undefined>(undefined)

export function useAuth (): AuthContextValue {
  const value = useContext(authContext)
  if (value == null) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return value
}

export function AuthProvider (props: {
  children: ReactNode
  session: Session | null
}): JSX.Element {
  const value: AuthContextValue = {
    session: props.session
  }

  return (
    <authContext.Provider value={value}>
      {props.children}
    </authContext.Provider>
  )
}
