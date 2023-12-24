import { AxiosError } from 'axios'
import { createContext, useContext, useState } from 'react'
import { ErrorBody, RequestContextValue } from './request-types'

export const requestContext = createContext<RequestContextValue | undefined>(undefined)

export function useRequest (): RequestContextValue {
  const value = useContext(requestContext)
  if (value == null) {
    throw new Error('useRequestContext must be used within a ButtonContextProvider')
  }
  return value
}

export function RequestProvider ({
  children,
  send,
  endless = false
}: {
  children: React.ReactNode
  send: () => Promise<void>
  endless?: boolean
}): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError<ErrorBody>>()
  const [errorMessage, setErrorMessage] = useState<string>()
  async function sendRequest (): Promise<void> {
    console.log('sendRequest')
    setLoading(true)
    setError(undefined)
    setErrorMessage(undefined)
    try {
      await send()
    } catch (error) {
      const e = error as AxiosError<ErrorBody>
      setError(e)
      setErrorMessage(e.response?.data?.error ?? e.message)
      setLoading(false)
    }
    if (endless) {
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

  return (
    <requestContext.Provider value={value}>
      {children}
    </requestContext.Provider>
  )
}