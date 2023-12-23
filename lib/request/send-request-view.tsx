'use client'

import { ReactNode } from 'react'
import { RequestProvider } from './request-context'
import SendRequestConsumer from './send-request-consumer'

export default function SendRequestView ({
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
      <SendRequestConsumer>
        {children}
      </SendRequestConsumer>
    </RequestProvider>
  )
}
