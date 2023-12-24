'use client'

import { ReactNode } from 'react'
import { RequestProvider } from './request-context'
import SendRequestConsumer from './send-request-consumer'

export default function SendRequestView (props: {
  children: ReactNode
  endless?: boolean
  send: () => Promise<void>
}): JSX.Element {
  return (
    <RequestProvider endless={props.endless} send={props.send}>
      <SendRequestConsumer>
        {props.children}
      </SendRequestConsumer>
    </RequestProvider>
  )
}
