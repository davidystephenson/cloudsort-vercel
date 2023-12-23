'use client'

import { ButtonProvider } from '@/lib/button/button-context'
import ButtonConsumer from './button-consumer'
import { ReactNode } from 'react'

export default function ButtonView (props: {
  children: ReactNode
  error?: string
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
}): JSX.Element {
  return (
    <ButtonProvider
      error={props.error}
      loading={props.loading}
      onClick={props.onClick}
      type={props.type}
    >
      <ButtonConsumer>
        {props.children}
      </ButtonConsumer>
    </ButtonProvider>
  )
}
