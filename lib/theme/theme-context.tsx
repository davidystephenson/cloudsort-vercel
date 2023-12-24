'use client'

import { createContext, useContext, ReactNode } from 'react'
import { ThemeContextValue } from './theme-types'

const themeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useTheme (): ThemeContextValue {
  const value = useContext(themeContext)
  if (value == null) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return value
}

export function ThemeProvider (props: {
  children: ReactNode
  shade?: string
}): JSX.Element {
  const value: ThemeContextValue = {
    shade: props.shade
  }
  return (
    <themeContext.Provider value={value}>
      {props.children}
    </themeContext.Provider>
  )
}
