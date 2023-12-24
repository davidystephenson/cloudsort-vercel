'use client'

import { ComponentProps } from 'react'
import { useRequest } from './request-context'
import RequestButtonView from './request-button-view'
import ButtonView from '../button/button-view'

export default function SendRequestConsumer (props: ComponentProps<typeof ButtonView>): JSX.Element {
  const request = useRequest()
  function handleClick (): void {
    void request.send()
  }
  return (
    <RequestButtonView
      onClick={handleClick}
      loading={request.loading}
      error={request.errorMessage}
      {...props}
    />
  )
}
