import { Session } from 'next-auth'
import { ReactNode } from 'react'
import { AuthContextProvider } from './auth-context'

export default function AuthView (props: {
  children: ReactNode
  session: Session | null
}): JSX.Element {
  return (
    <AuthContextProvider session={props.session}>{props.children}</AuthContextProvider>
  )
}
