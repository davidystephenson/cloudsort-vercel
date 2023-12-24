'use client'

import { ReactNode } from 'react'
import { RequestProvider } from './request-context'
import RequestFormConsumer from './request-form-consumer'

export default function RequestFormView (props: {
  children: ReactNode
  endless?: boolean
  send: () => Promise<void>
}): JSX.Element {
  return (
    <RequestProvider endless={props.endless} send={props.send}>
      <RequestFormConsumer>
        {props.children}
      </RequestFormConsumer>
    </RequestProvider>
  )
}
