'use client'

import { ThemeContextValue } from './theme-types'
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth/auth-context'
import useMounted from '../mounted/use-mounted'
import { contextCreator } from '../context-creator/context-creator'

function useValue (props: {
  shade?: string
}): ThemeContextValue {
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
    mounted,
    shade: props.shade
  }
  return value
}

export const {
  useCreatedContext: useTheme,
  CreatedProvider: ThemeProvider
} = contextCreator({
  name: 'theme',
  useValue
})
