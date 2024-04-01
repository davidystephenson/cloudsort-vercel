'use client'

import { forwardRef, ForwardedRef, ReactNode } from 'react'
import { useRequest } from './request-context'
import { ButtonContextValue } from '../button/button-types'
import { ButtonProps } from '@chakra-ui/react'
import ButtonView from '../button/button-view'

function Consumer (
  props: {
    children?: ReactNode
    iconOnly?: boolean
  } & ButtonContextValue & ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const request = useRequest()
  function handleClick (): void {
    void request.send()
  }
  return (
    <ButtonView
      errorMessage={request.errorMessage}
      handleClick={handleClick}
      loading={request.loading}
      ref={ref}
      {...props}
    />
  )
}

const RequestButtonConsumer = forwardRef(Consumer)

export default RequestButtonConsumer
