'use client'

import { ReactNode } from 'react'
import { useRequest } from './request-context'
import ButtonView from '../button/button-view'

export default function SubmitRequestView ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const request = useRequest()
  return (
    <ButtonView
      loading={request.loading}
      error={request.errorMessage}
      type='submit'
      onClick={() => {
        console.log('SubmitRequestView.onClick')
      }}
    >
      {children}
    </ButtonView>
  )
}
