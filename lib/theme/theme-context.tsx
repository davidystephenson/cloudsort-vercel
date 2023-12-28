'use client'

import { createContext, useContext, ReactNode } from 'react'
import { ThemeContextValue } from './theme-types'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth/auth-context'
import useMounted from '../mounted/use-mounted'

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
  const auth = useAuth()
  const mounted = useMounted()
  const router = useRouter()

  const darkened = props.shade === 'dark'

  async function postTheme ({ theme }: {
    theme: string
  }): Promise<void> {
    const body = JSON.stringify({ theme })
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    }
    await fetch('/api/theme', options)
    document.cookie = 'newTheme=none;'
  }

  function updateTheme ({ theme }: {
    theme: string
  }): void {
    document.cookie = `theme=${theme};`
    document.cookie = `newTheme=${theme}; expires=0;`
    router.refresh()
    if (auth.session == null) {
      return
    }
    void postTheme({ theme })
  }

  function handleChangeTheme (): void {
    if (!mounted) {
      return
    }
    if (darkened) {
      updateTheme({ theme: 'light' })
    } else {
      updateTheme({ theme: 'dark' })
    }
  }
  const value: ThemeContextValue = {
    handleChangeTheme,
    darkened,
    shade: props.shade
  }
  return (
    <themeContext.Provider value={value}>
      {props.children}
    </themeContext.Provider>
  )
}
