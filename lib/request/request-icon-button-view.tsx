'use client'

import { RequestProvider } from './request-context'
import { IconButtonProps } from '@chakra-ui/react'
import RequestIconButtonConsumer from './request-icon-button-consumer'

export default function RequestIconButtonView (props: {
  endless?: boolean
  send: () => Promise<void>
} & IconButtonProps): JSX.Element {
  const { endless, send, ...consumerProps } = props
  return (
    <RequestProvider
      endless={endless}
      send={send}
    >
      <RequestIconButtonConsumer {...consumerProps} />
    </RequestProvider>
  )
}
