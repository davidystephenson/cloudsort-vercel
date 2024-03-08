'use client'

import { ButtonProvider } from '@/button/button-context'
import ButtonConsumer from './button-consumer'
import { ButtonContextValue } from './button-types'
import { ButtonProps } from '@chakra-ui/react'

export default function ButtonView (props: ButtonContextValue & ButtonProps): JSX.Element {
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
      <ButtonConsumer {...restProps} />
    </ButtonProvider>
  )
}
