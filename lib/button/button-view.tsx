'use client'

import { ButtonProvider } from '@/lib/button/button-context'
import ButtonConsumer from './button-consumer'
import { ButtonContextValue } from './button-types'
import { ButtonProps } from '@chakra-ui/react'

export default function ButtonView (props: ButtonContextValue & ButtonProps): JSX.Element {
  const { error, handleClick, loading, type, ...restProps } = props
  function onClick (): void {
    handleClick?.()
  }
  return (
    <ButtonProvider
      error={error}
      loading={loading}
      handleClick={onClick}
      type={type}
    >
      <ButtonConsumer {...restProps} />
    </ButtonProvider>
  )
}
