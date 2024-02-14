'use client'

import { ReactNode } from 'react'
import { useRequest } from './request-context'
import { ButtonContextValue } from '../button/button-types'
import { IconButtonProps } from '@chakra-ui/react'
import IconButtonView from '../button/icon-button-view'

export default function RequestIconButtonConsumer (props: {
  children?: ReactNode
  iconOnly?: boolean
} & ButtonContextValue & IconButtonProps): JSX.Element {
  const request = useRequest()
  function handleClick (): void {
    void request.send()
  }
  return (
    <IconButtonView
      handleClick={handleClick}
      loading={request.loading}
      errorMessage={request.errorMessage}
      {...props}
    />
  )
}
