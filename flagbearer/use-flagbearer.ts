import { useCallback, useState } from 'react'
import { Flagbearer } from './flagbearer-types'

export default function useFlagbearer (props?: {
  initial?: boolean
  onLower?: () => void
  onRaise?: () => void
}): Flagbearer {
  const [flag, setFlag] = useState(props?.initial ?? false)
  const raise = useCallback(() => {
    setFlag(true)
    props?.onRaise?.()
  }, [])
  const lower = useCallback(() => {
    setFlag(false)
    props?.onLower?.()
  }, [])
  const toggle = useCallback(() => {
    if (flag) {
      lower()
    } else {
      raise()
    }
  }, [flag, lower, raise])
  const flagbearer = {
    flag,
    lower,
    raise,
    toggle
  }
  return flagbearer
}
