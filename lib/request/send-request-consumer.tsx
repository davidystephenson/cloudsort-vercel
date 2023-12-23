'use client'

import { ReactNode } from 'react'
import { useRequestContext } from './request-context'
import ButtonView from '../button/button-view'

export default function SendRequestConsumer ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const request = useRequestContext()
  function handleClick (): void {
    void request.send()
  }
  return (
    <ButtonView
      onClick={handleClick}
      loading={request.loading}
      error={request.errorMessage}
    >
      {children}
    </ButtonView>
  )
}
