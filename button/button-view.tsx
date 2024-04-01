'use client'

import { forwardRef, ForwardedRef } from 'react'
import { ButtonProvider } from '@/button/button-context'
import ButtonConsumer from './button-consumer'
import { ButtonContextValue } from './button-types'
import { ButtonProps } from '@chakra-ui/react'

function View (
  props: ButtonContextValue & ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const { errorMessage, handleClick, loading, type, ...restProps } = props
  function onClick (): void {
    handleClick?.()
  }
  return (
    <ButtonProvider
      errorMessage={errorMessage}
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
