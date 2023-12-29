'use client'

import { useRequest } from './request-context'
import ButtonView from '../button/button-view'
import { ButtonProps } from '@nextui-org/react'
import { ReactNode } from 'react'

export default function RequestButtonView (props: {
  children: ReactNode
} & ButtonProps): JSX.Element {
  const request = useRequest()
  return (
    <ButtonView
      loading={request.loading}
      error={request.errorMessage}
      {...props}
    />
  )
}
