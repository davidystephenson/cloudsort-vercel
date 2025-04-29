'use client'

import { forwardRef, ForwardedRef } from 'react'
import { ButtonProvider } from '@/button/button-context'
import ButtonConsumer from './button-consumer'
import { ButtonContextValue } from './button-types'
import { ButtonProps } from '@chakra-ui/react'

function View (
  props: {
    leftButton?: JSX.Element
  } & ButtonContextValue & ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const { error: errorMessage, handleClick, loading, type, ...restProps } = props
  function onClick (): void {
    handleClick?.()
  }
  return (
    <ButtonProvider
      error={errorMessage}
      loading={loading}
      handleClick={onClick}
      type={type}
    >
      <ButtonConsumer ref={ref} {...restProps} />
    </ButtonProvider>
  )
}

const ButtonView = forwardRef(View)

export default ButtonView
