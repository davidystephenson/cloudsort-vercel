'use client'

import { useAuthContext } from '@/auth/auth-context'
import contextCreator from 'context-creator'

const listContext = contextCreator({
  name: 'list',
  useValue: (props: {
    id: number
    name: string
    seed: string
    userId: number
  }) => {
    const auth = useAuthContext()
    const _private = auth.session?.user.id === props.userId
    const value = {
      id: props.id,
      name: props.name,
      private: _private,
      seed: props.seed,
      userId: props.userId
    }
    return value
  }
})
export const {
  useContext: useListContext,
  Provider: ListContextProvider
} = listContext
