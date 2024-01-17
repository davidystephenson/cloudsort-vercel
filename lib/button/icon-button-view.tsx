'use client'

import { ButtonProvider } from '@/lib/button/button-context'
import { ButtonContextValue } from './button-types'
import { IconButtonProps } from '@chakra-ui/react'
import IconButtonConsumer from './icon-button-consumer'

export default function IconButtonView (props: ButtonContextValue & IconButtonProps): JSX.Element {
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
      <IconButtonConsumer {...restProps} />
    </ButtonProvider>
  )
}
