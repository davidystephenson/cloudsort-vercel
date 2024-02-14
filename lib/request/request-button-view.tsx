'use client'

import { ReactNode } from 'react'
import { RequestProvider } from './request-context'
import { ButtonProps } from '@chakra-ui/react'
import RequestButtonConsumer from './request-button-consumer'
import { ActionProvider } from '../action/action-context'

export default function RequestButtonView (props: {
  children: ReactNode
  endless?: boolean
  send: () => Promise<void>
} & ButtonProps): JSX.Element {
  const { endless, send, ...buttonProps } = props
  return (
    <ActionProvider>
      <RequestProvider
        endless={endless}
        send={send}
      >
        <RequestButtonConsumer {...buttonProps} />
      </RequestProvider>
    </ActionProvider>
  )
}
