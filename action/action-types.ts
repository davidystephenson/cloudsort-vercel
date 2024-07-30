export interface Action {
  act: () => Promise<void>
  error: Error | undefined
  errorMessage: string | undefined
  fail: (props: {
    error: Error
    message?: string
  }) => void
  active: boolean
  start: () => void
  succeed: () => void
}
