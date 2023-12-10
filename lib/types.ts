export interface Store {
  loginError: Error | undefined
  loginLoading: boolean
  login: ({ email, password }: {
    email: string
    password: string
  }) => Promise<void>
  registerError: Error | undefined
  registerLoading: boolean
  register: ({ email, password }: {
    email: string
    password: string
  }) => Promise<void>
}
