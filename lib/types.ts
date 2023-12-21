import { AxiosError } from 'axios'
import { ChangeEvent } from 'react'

export interface ErrorBody {
  error: string
}
export interface RequestContextValue {
  error: AxiosError<ErrorBody> | undefined
  errorMessage: string | undefined
  loading: boolean
  send: () => Promise<void>
}
export interface RequestState <Props, ResponseBody = void> {
  error?: Error
  loading: boolean
  send: (props: Props) => Promise<ResponseBody>
}
export interface AuthProps {
  email: string
  password: string
}
export interface CreateListProps {
  name: string
}
export interface ButtonContextValue {
  loading?: boolean
  handleClick?: () => void
  error?: string | undefined
  type?: 'button' | 'submit'
}

export interface Store {
  login: RequestState<AuthProps>
  register: RequestState<AuthProps>
  shade?: string
}

export interface AuthFormContextValue {
  email: string
  password: string
  handleEmailChange: (event: ChangeEvent<HTMLInputElement>) => void
  handlePasswordChange: (event: ChangeEvent<HTMLInputElement>) => void
  send: () => Promise<void>
}
