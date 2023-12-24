import { AxiosError } from 'axios'

export interface ErrorBody {
  error: string
}
export interface RequestContextValue {
  error: AxiosError<ErrorBody> | undefined
  errorMessage: string | undefined
  loading: boolean
  send: () => Promise<void>
}
