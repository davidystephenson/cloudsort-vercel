'use client'

import { ButtonProvider } from '@/lib/button/button-context'
import ButtonConsumer from './button-consumer'
import { ReactNode } from 'react'
import { ButtonContextValue } from './button-types'
import { ButtonProps } from '@nextui-org/react'

export default function ButtonView (props: {
  children: ReactNode
} & ButtonContextValue & ButtonProps): JSX.Element {
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
