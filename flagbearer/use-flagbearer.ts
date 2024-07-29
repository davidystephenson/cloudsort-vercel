import { useCallback, useState } from 'react'
import { Flagbearer } from './flagbearer-types'

export default function useFlagbearer (props?: {
  initial?: boolean
  onLower?: () => void
  onRaise?: () => void
}): Flagbearer {
  const [raised, setRaised] = useState(props?.initial ?? false)
  const raise = useCallback(() => {
    setRaised(true)
    props?.onRaise?.()
  }, [])
  const lower = useCallback(() => {
    setRaised(false)
    props?.onLower?.()
  }, [])
  const toggle = useCallback(() => {
    if (raised) {
      lower()
    } else {
      raise()
    }
  }, [raised, lower, raise])
  const flagbearer = {
    flag: raised,
    lower,
    raise,
    toggle
  }
  return flagbearer
}
