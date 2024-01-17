'use client'

import { ReactNode } from 'react'
import { useRequest } from './request-context'
import { ButtonContextValue } from '../button/button-types'
import { ButtonProps } from '@chakra-ui/react'
import ButtonView from '../button/button-view'

export default function RequestButtonConsumer (props: {
  children?: ReactNode
  iconOnly?: boolean
} & ButtonContextValue & ButtonProps): JSX.Element {
  const request = useRequest()
  function handleClick (): void {
    void request.send()
  }
  return (
    <ButtonView
      handleClick={handleClick}
      loading={request.loading}
      error={request.errorMessage}
      {...props}
    />
  )
}
