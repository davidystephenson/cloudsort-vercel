'use client'

import { AuthContextValue } from './auth-types'
import { Session } from 'next-auth'
import { contextCreator } from '../context-creator/context-creator'

function useValue (props: {
  session: Session | null
}): AuthContextValue {
  const value: AuthContextValue = {
    session: props.session
  }

  return value
}

export const {
  useCreatedContext: useAuth,
  CreatedProvider: AuthProvider
} = contextCreator({
  useValue
})
