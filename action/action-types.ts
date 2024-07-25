export interface Action {
  error: Error | undefined
  errorMessage: string | undefined
  fail: (props: {
    error: Error
    message?: string
  }) => void
  acting: boolean
  start: () => void
  succeed: () => void
}
