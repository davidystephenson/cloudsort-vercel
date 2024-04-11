'use client'

import { ComponentProps } from 'react'
import { RequestProvider } from './request-context'
import RequestFormConsumer from './request-form-consumer'
import { useForm } from '../form/form-context'

export default function RequestFormController (props: {
  endless?: boolean
  send: (props: { values: Record<string, string> }) => Promise<unknown>
} & ComponentProps<'form'>): JSX.Element {
  const form = useForm()
  const { send, endless, ...restProps } = props
  async function sendRequest (): Promise<void> {
    if (form.fields == null) {
      throw new Error('There are no fields')
    }
    const values: Record<string, string> = {}
    const entries = Object.entries(form.fields)
    for (const [name, field] of entries) {
      values[name] = field.value
    }
    await send({ values })
  }
  return (
    <RequestProvider endless={endless} send={sendRequest}>
      <RequestFormConsumer {...restProps} />
    </RequestProvider>
  )
}
