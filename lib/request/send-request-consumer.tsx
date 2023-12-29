'use client'

import { ReactNode } from 'react'
import { useRequest } from './request-context'
import RequestButtonView from './request-button-view'
import { ButtonContextValue } from '../button/button-types'
import { ButtonProps } from '@nextui-org/react'

export default function SendRequestConsumer (props: {
  children: ReactNode
} & ButtonContextValue & ButtonProps): JSX.Element {
  const request = useRequest()
  function handleClick (): void {
    void request.send()
  }
  return (
    <RequestButtonView
      handleClick={handleClick}
      loading={request.loading}
      error={request.errorMessage}
      {...props}
    />
  )
}
