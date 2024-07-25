import { Session } from 'next-auth'
import { ReactNode } from 'react'
import { AuthContextProvider } from './auth-context'
import { ItemHide } from '@prisma/client'

export default function AuthView (props: {
  children: ReactNode
  itemHides?: ItemHide[]
  session: Session | null
}): JSX.Element {
  return (
    <AuthContextProvider
      itemHides={props.itemHides}
      session={props.session}
    >
      {props.children}
    </AuthContextProvider>
  )
}
