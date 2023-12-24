'use client'

import { useRequest } from './request-context'
import ButtonView from '../button/button-view'
import { ComponentProps, forwardRef } from 'react'

const RequestButtonView = forwardRef<HTMLButtonElement, ComponentProps<typeof ButtonView>>(function (props, ref) {
  const request = useRequest()
  return (
    <ButtonView
      loading={request.loading}
      error={request.errorMessage}
      {...props}
      ref={ref}
    />
  )
})

export default RequestButtonView
