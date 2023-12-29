import { createContext, useContext } from 'react'
import { ButtonContextValue } from './button-types'

export const buttonContext = createContext<ButtonContextValue | undefined>(undefined)

export function useButtonContext (): ButtonContextValue {
  const value = useContext(buttonContext)
  if (value == null) {
    throw new Error('useButtonContext must be used within a ButtonContextProvider')
  }
  return value
}

export function ButtonProvider (props: {
  children: React.ReactNode
} & ButtonContextValue): JSX.Element {
  const value: ButtonContextValue = {
    error: props.error,
    iconOnly: props.iconOnly,
    loading: props.loading,
    handleClick: props.handleClick,
    type: props.type
  }

  return (
    <buttonContext.Provider value={value}>
      {props.children}
    </buttonContext.Provider>
  )
}
