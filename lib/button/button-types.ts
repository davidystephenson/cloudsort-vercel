export interface ButtonContextValue {
  loading?: boolean
  handleClick?: () => void
  error?: string | undefined
  type?: 'button' | 'submit'
}
