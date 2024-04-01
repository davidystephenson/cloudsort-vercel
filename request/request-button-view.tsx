'use client'

import { ForwardedRef, ReactNode, forwardRef } from 'react'
import { RequestProvider } from './request-context'
import { ButtonProps } from '@chakra-ui/react'
import RequestButtonConsumer from './request-button-consumer'
import { ActionProvider } from '../action/action-context'

function View (
  props: {
    children: ReactNode
    endless?: boolean
    send: () => Promise<void>
  } & ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const { endless, send, ...buttonProps } = props
  return (
    <ActionProvider>
      <RequestProvider
        endless={endless}
        send={send}
      >
        <RequestButtonConsumer ref={ref} {...buttonProps} />
      </RequestProvider>
    </ActionProvider>
  )
}

const RequestButtonView = forwardRef(View)

export default RequestButtonView
