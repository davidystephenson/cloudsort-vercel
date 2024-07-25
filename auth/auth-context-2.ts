'use client'

import { Session } from 'next-auth'
import contextCreator from 'context-creator'

const authContext = contextCreator({
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
console.log('a', authContext)
export const {
  useContext: useAuthContext,
  Provider: AuthContextProvider
} = authContext
