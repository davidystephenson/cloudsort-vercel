'use client'

import { ReactNode } from 'react'
import { RequestProvider } from './request-context'
import SendRequestConsumer from './send-request-consumer'

export default function SendRequestView ({
  children,
  send
}: {
  children: ReactNode
  send: () => Promise<void>
}): JSX.Element {
  return (
    <RequestProvider send={send}>
      <SendRequestConsumer>
        {children}
      </SendRequestConsumer>
    </RequestProvider>
  )
}
