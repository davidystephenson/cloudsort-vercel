'use client'

import { RequestProvider } from './request-context'
import { IconButtonProps } from '@chakra-ui/react'
import RequestButtonConsumer from './request-button-consumer'

export default function RequestIconButtonView (props: {
  endless?: boolean
  send: () => Promise<void>
} & IconButtonProps): JSX.Element {
  const { endless, send, ...buttonProps } = props
  return (
    <RequestProvider
      endless={endless}
      send={send}
    >
      <RequestButtonConsumer {...buttonProps} />
    </RequestProvider>
  )
}
