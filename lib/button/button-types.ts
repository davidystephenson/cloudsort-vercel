export interface ButtonContextValue {
  errorMessage?: string | undefined
  handleClick?: () => void
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}
