'use client'

import { ReactNode } from 'react'
import { RequestProvider } from './request-context'
import RequestFormConsumer from './request-form-consumer'

export default function RequestFormView ({
  children,
  send
}: {
  children: ReactNode
  send: () => Promise<void>
}): JSX.Element {
  return (
    <RequestProvider send={send}>
      <RequestFormConsumer>
        {children}
      </RequestFormConsumer>
    </RequestProvider>
  )
}
