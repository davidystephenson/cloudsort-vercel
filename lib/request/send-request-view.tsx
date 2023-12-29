'use client'

import { ReactNode } from 'react'
import { RequestProvider } from './request-context'
import SendRequestConsumer from './send-request-consumer'
import { ButtonProps } from '@nextui-org/react'

export default function SendRequestView (props: {
  children: ReactNode
  endless?: boolean
  send: () => Promise<void>
  iconOnly?: boolean
} & ButtonProps): JSX.Element {
  const { endless, send, ...buttonProps } = props
  return (
    <RequestProvider
      endless={endless}
      send={send}
    >
      <SendRequestConsumer {...buttonProps} />
    </RequestProvider>
  )
}
