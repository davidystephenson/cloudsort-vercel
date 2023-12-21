'use client'

import { ReactNode } from 'react'
import { useRequestContext } from './request-context'
import ButtonView from '../button/button-view'

export default function SubmitRequestView ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const request = useRequestContext()
  return (
    <ButtonView
      loading={request.loading}
      error={request.errorMessage}
      type='submit'
    >
      {children}
    </ButtonView>
  )
}
