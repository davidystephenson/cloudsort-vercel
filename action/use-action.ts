import { useState, useEffect } from 'react'
import { Action } from './action-types'

export default function useAction (props?: {
  action: () => Promise<void>
  acting?: boolean
}): Action {
  const [active, setActive] = useState(props?.acting ?? false)
  useEffect(() => {
    setActive(props?.acting ?? false)
  }, [props?.acting])
  const [error, setError] = useState<Error>()
  const [errorMessage, setErrorMessage] = useState<string>()
  async function act (): Promise<void> {
    start()
    try {
      await props?.action()
      succeed()
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error
      }
      fail({ error })
    }
  }
  function start (): void {
    setActive(true)
    setError(undefined)
    setErrorMessage(undefined)
  }
  function succeed (): void {
    setActive(false)
  }
  function fail (props: {
    error: Error
    message?: string
  }): void {
    setError(props.error)
    const message = props.message ?? props.error.message
    setErrorMessage(message)
    setActive(false)
  }
  const value = {
    act,
    error,
    errorMessage,
    fail,
    active,
    start,
    succeed
  }
  return value
}
