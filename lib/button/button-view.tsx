'use client'

import { ButtonProvider } from '@/lib/button/button-context'
import ButtonConsumerView from './button-consumer-view'
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
      <ButtonConsumerView>
        {props.children}
      </ButtonConsumerView>
    </ButtonProvider>
  )
}
