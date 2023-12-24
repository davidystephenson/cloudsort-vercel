'use client'

import { ButtonProvider } from '@/lib/button/button-context'
import ButtonConsumer from './button-consumer'
import { ReactNode, ForwardedRef, forwardRef } from 'react'

function Button (
  props: {
    children: ReactNode
    error?: string
    loading?: boolean
    onClick?: () => void
    type?: 'button' | 'submit'
  },
  ref: ForwardedRef<HTMLButtonElement>
): JSX.Element {
  return (
    <ButtonProvider
      error={props.error}
      loading={props.loading}
      onClick={props.onClick}
      type={props.type}
    >
      <ButtonConsumer ref={ref}>
        {props.children}
      </ButtonConsumer>
    </ButtonProvider>
  )
}

const ButtonView = forwardRef(Button)

export default ButtonView
