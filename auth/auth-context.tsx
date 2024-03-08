'use client'

import { Session } from 'next-auth'
import contextCreator from 'context-creator'

export const {
  useContext: useAuth,
  Provider: AuthProvider
} = contextCreator({
  name: 'auth',
  useValue: (props: {
    session: Session | null
  }) => {
    const value = {
      session: props.session
    }

    return value
  }
})
