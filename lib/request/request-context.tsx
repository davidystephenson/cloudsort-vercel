import { AxiosError } from 'axios'
import { ErrorBody, RequestContextValue } from './request-types'
import { contextCreator } from '../context-creator/context-creator'
import { useState } from 'react'

function useValue (props: {
  children: React.ReactNode
  send: () => Promise<void>
  endless?: boolean
}): RequestContextValue {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError<ErrorBody>>()
  const [errorMessage, setErrorMessage] = useState<string>()
  async function sendRequest (): Promise<void> {
    setLoading(true)
    setError(undefined)
    setErrorMessage(undefined)
    try {
      await props.send()
    } catch (error) {
      const e = error as AxiosError<ErrorBody>
      setError(e)
      setErrorMessage(e.response?.data?.error ?? e.message)
      setLoading(false)
    }
    if (props.endless === true) {
      return
    }
    setLoading(false)
  }
  const value: RequestContextValue = {
    error,
    errorMessage,
    send: sendRequest,
    loading
  }
  return value
}
export const {
  useCreatedContext: useRequest,
  CreatedProvider: RequestProvider
} = contextCreator({
  name: 'request',
  useValue
})
