import { ReactNode } from 'react'

export interface ButtonContextValue {
  error?: ReactNode | undefined
  handleClick?: () => void
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  orientation?: 'horizontal' | 'vertical'
}
