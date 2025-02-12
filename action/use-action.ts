import { useState, useEffect, useCallback, useMemo } from 'react'
import { Action } from './action-types'

export default function useAction (props?: {
  action?: () => Promise<void>
  active?: boolean
}): Action {
  const [active, setActive] = useState(props?.active ?? false)
  useEffect(() => {
    setActive(props?.active ?? false)
  }, [props?.active])
  const [error, setError] = useState<Error>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const start = useCallback(() => {
    setActive(true)
    setError(undefined)
    setErrorMessage(undefined)
  }, [])
  const succeed = useCallback(() => {
    setActive(false)
  }, [])
  const fail = useCallback((props: {
    error: Error
    message?: string
  }) => {
    setError(props.error)
    const message = props.message ?? props.error.message
    setErrorMessage(message)
    setActive(false)
  }, [])
  const act = useCallback(async () => {
    start()
    try {
      await props?.action?.()
      succeed()
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error
      }
      fail({ error })
    }
  }, [props?.action, fail, start, succeed])
  const value = useMemo(() => {
    return {
      act,
      error,
      errorMessage,
      fail,
      active,
      start,
      succeed
    }
  }, [
    act,
    error,
    errorMessage,
    fail,
    active,
    start,
    succeed
  ])
  return value
}
