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

export function ButtonProvider ({
  children,
  error,
  loading,
  onClick,
  type
}: {
  children: React.ReactNode
  error?: string
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
}): JSX.Element {
  const value: ButtonContextValue = {
    error,
    loading,
    handleClick: onClick,
    type
  }

  return (
    <buttonContext.Provider value={value}>
      {children}
    </buttonContext.Provider>
  )
}
