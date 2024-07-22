import { useEffect, useState } from 'react'
import contextCreator from 'context-creator'

export const {
  useContext: useAction,
  useOptionalContext: useOptionalAction,
  Provider: ActionProvider
} = contextCreator({
  name: 'action',
  useValue: (props: {
    loading?: boolean
  }) => {
    const [loading, setLoading] = useState(props.loading ?? false)
    useEffect(() => {
      setLoading(props.loading ?? false)
    }, [props.loading])
    const [error, setError] = useState<Error>()
    const [errorMessage, setErrorMessage] = useState<string>()
    function start (): void {
      setLoading(true)
      setError(undefined)
      setErrorMessage(undefined)
    }
    function succeed (): void {
      setLoading(false)
    }
    function fail (props: {
      error: Error
      message?: string
    }): void {
      setError(props.error)
      const message = props.message ?? props.error.message
      setErrorMessage(message)
      setLoading(false)
    }
    const value = {
      error,
      errorMessage,
      fail,
      loading,
      start,
      succeed
    }
    return value
  }
})
