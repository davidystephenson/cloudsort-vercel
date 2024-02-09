'use client'

import { ComponentProps } from 'react'
import { RequestProvider } from './request-context'
import RequestFormConsumer from './request-form-consumer'
import { useForm } from '../form/form-context'
import { Fields } from '../form/form-types'

export default function RequestFormController (props: {
  endless?: boolean
  send: (fields: Fields) => Promise<unknown>
} & ComponentProps<'form'>): JSX.Element {
  const form = useForm()
  const { send, endless, ...restProps } = props
  async function sendRequest (): Promise<void> {
    await send(form.fields)
  }
  return (
    <RequestProvider endless={endless} send={sendRequest}>
      <RequestFormConsumer {...restProps} />
    </RequestProvider>
  )
}
