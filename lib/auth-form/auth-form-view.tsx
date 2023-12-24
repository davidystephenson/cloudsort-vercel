'use client'
import { Fields } from '../form/form-types'
import RequestFormView from '../request/request-form-view'
import AuthFormConsumer from './auth-form-consumer'

export default function AuthFormView (props: {
  children: React.ReactNode
  send: (fields: Fields) => Promise<unknown>
}): JSX.Element {
  return (
    <RequestFormView endless send={props.send}>
      <AuthFormConsumer>
        {props.children}
      </AuthFormConsumer>
    </RequestFormView>
  )
}
