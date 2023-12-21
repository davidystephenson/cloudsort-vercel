import { ErrorBody, RequestContextValue } from '@/lib/types'
import { AxiosError } from 'axios'
import { createContext, useContext, useState } from 'react'

export const requestContext = createContext<RequestContextValue | undefined>(undefined)

export function useRequestContext (): RequestContextValue {
  const value = useContext(requestContext)
  if (value == null) {
    throw new Error('useRequestContext must be used within a ButtonContextProvider')
  }
  return value
}

export function RequestProvider ({
  children,
  send
}: {
  children: React.ReactNode
  send: () => Promise<void>
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
      console.log('after')
    } catch (error) {
      console.log('error', error)
      const e = error as AxiosError<ErrorBody>
      console.log('e', e)
      setError(e)
      setErrorMessage(e.response?.data?.error ?? e.message)
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
