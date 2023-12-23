'use client'

import { ReactNode } from 'react'
import { RequestProvider } from './request-context'
import RequestFormConsumer from './request-form-consumer'

export default function RequestFormView ({
  children,
  endless = false,
  send
}: {
  children: ReactNode
  endless?: boolean
  send: () => Promise<void>
}): JSX.Element {
  return (
    <RequestProvider endless={endless} send={send}>
      <RequestFormConsumer>
        {children}
      </RequestFormConsumer>
    </RequestProvider>
  )
}
