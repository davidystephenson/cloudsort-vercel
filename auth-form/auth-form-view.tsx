'use client'
import RequestFormView from '../request/request-form-view'
import AuthFormConsumer from './auth-form-consumer'

export default function AuthFormView (props: {
  children: React.ReactNode
  send: (pros: { values: Record<string, string> }) => Promise<unknown>
}): JSX.Element {
  return (
    <RequestFormView endless send={props.send}>
      <AuthFormConsumer>
        {props.children}
      </AuthFormConsumer>
    </RequestFormView>
  )
}
