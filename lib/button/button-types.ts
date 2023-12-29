export interface ButtonContextValue {
  error?: string | undefined
  handleClick?: () => void
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}
