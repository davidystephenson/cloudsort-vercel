'use client'

import { ButtonProvider } from '@/button/button-context'
import { ButtonContextValue } from './button-types'
import { IconButtonProps } from '@chakra-ui/react'
import IconButtonConsumer from './icon-button-consumer'
import { ForwardedRef, forwardRef } from 'react'

function View (
  props: ButtonContextValue & IconButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  const { error: error, handleClick, loading, type, orientation, ...restProps } = props
  function onClick (): void {
    handleClick?.()
  }
  return (
    <ButtonProvider
      error={error}
      loading={loading}
      handleClick={onClick}
      orientation={orientation}
      type={type}
    >
      <IconButtonConsumer ref={ref} {...restProps} />
    </ButtonProvider>
  )
}

const IconButtonView = forwardRef(View)
export default IconButtonView
