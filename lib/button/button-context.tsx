import { ButtonContextValue } from '@/lib/types'
import { createContext, useContext } from 'react'

export const buttonContext = createContext<ButtonContextValue | undefined>(undefined)

export function useButtonContext (): ButtonContextValue {
  const value = useContext(buttonContext)
  if (value == null) {
    throw new Error('useButtonContext must be used within a ButtonContextProvider')
  }
  return value
}

export function ButtonContextProvider ({
  children,
  error,
  loading = false
}: {
  children: React.ReactNode
  error?: string
  loading?: boolean
}): JSX.Element {
  const value: ButtonContextValue = {
    error,
    loading
  }
  return (
    <buttonContext.Provider value={value}>
      {children}
    </buttonContext.Provider>
  )
}
