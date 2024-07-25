import { useState, useEffect } from 'react'
import { Action } from './action-types'

export default function useAction (props?: {
  acting?: boolean
}): Action {
  const [acting, setActing] = useState(props?.acting ?? false)
  useEffect(() => {
    setActing(props?.acting ?? false)
  }, [props?.acting])
  const [error, setError] = useState<Error>()
  const [errorMessage, setErrorMessage] = useState<string>()
  function start (): void {
    setActing(true)
    setError(undefined)
    setErrorMessage(undefined)
  }
  function succeed (): void {
    setActing(false)
  }
  function fail (props: {
    error: Error
    message?: string
  }): void {
    setError(props.error)
    const message = props.message ?? props.error.message
    setErrorMessage(message)
    setActing(false)
  }
  const value = {
    error,
    errorMessage,
    fail,
    acting,
    start,
    succeed
  }
  return value
}
