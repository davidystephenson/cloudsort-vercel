'use client'

import { useRequest } from './request-context'
import ButtonView from '../button/button-view'
import { ComponentProps } from 'react'

export default function RequestButtonView (
  props: ComponentProps<typeof ButtonView>
): JSX.Element {
  const request = useRequest()
  return (
    <ButtonView
      loading={request.loading}
      error={request.errorMessage}
      {...props}
    />
  )
}
