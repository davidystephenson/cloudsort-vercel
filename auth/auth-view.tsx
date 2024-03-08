import { Session } from 'next-auth'
import { ReactNode } from 'react'
import { AuthProvider } from './auth-context'

export default async function AuthView (props: {
  children: ReactNode
  session: Session | null
}): Promise<JSX.Element> {
  return (
    <AuthProvider session={props.session}>
      {props.children}
    </AuthProvider>
  )
}
