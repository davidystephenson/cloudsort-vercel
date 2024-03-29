'use client'

import { ButtonProvider } from '@/button/button-context'
import { ButtonContextValue } from './button-types'
import { IconButtonProps } from '@chakra-ui/react'
import IconButtonConsumer from './icon-button-consumer'

export default function IconButtonView (props: ButtonContextValue & IconButtonProps): JSX.Element {
  const { errorMessage: error, handleClick, loading, type, orientation, ...restProps } = props
  function onClick (): void {
    handleClick?.()
  }
  return (
    <ButtonProvider
      errorMessage={error}
      loading={loading}
      handleClick={onClick}
      orientation={orientation}
      type={type}
    >
      <IconButtonConsumer {...restProps} />
    </ButtonProvider>
  )
}
