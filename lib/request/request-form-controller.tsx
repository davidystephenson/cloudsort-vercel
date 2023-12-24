'use client'

import { ReactNode } from 'react'
import { RequestProvider } from './request-context'
import RequestFormConsumer from './request-form-consumer'
import { useForm } from '../form/form-context'
import { Fields } from '../form/form-types'

export default function RequestFormController (props: {
  children: ReactNode
  endless?: boolean
  send: (fields: Fields) => Promise<unknown>
}): JSX.Element {
  const form = useForm()
  async function sendRequest (): Promise<void> {
    await props.send(form.fields)
  }
  return (
    <RequestProvider endless={props.endless} send={sendRequest}>
      <RequestFormConsumer>
        {props.children}
      </RequestFormConsumer>
    </RequestProvider>
  )
}
