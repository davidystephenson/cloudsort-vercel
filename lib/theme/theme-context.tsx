'use client'

import { ThemeContextValue } from './theme-types'
import { useAuth } from '../auth/auth-context'
import useMounted from '../mounted/use-mounted'
import { contextCreator } from '../context-creator/context-creator'
import useSystemDark from '../use-system-dark/useSystemDark'
import { useCallback, useEffect, useMemo } from 'react'
import { useColorMode } from '@chakra-ui/react'

function useValue (props: {
  shade?: string
}): ThemeContextValue {
  const auth = useAuth()
  const mounted = useMounted()
  const colorMode = useColorMode()
  const systemDark = useSystemDark()
  const darkened = useMemo(() => colorMode.colorMode === 'dark', [colorMode.colorMode])

  useEffect(() => {
    const different = systemDark !== darkened
    if (different && auth.session?.user.theme == null) {
      colorMode.toggleColorMode()
    }
  }, [auth.session, colorMode, darkened, systemDark])

  const updateTheme = useCallback((props: {
    theme: string
  }) => {
    colorMode.toggleColorMode()
    if (auth.session == null) {
      return
    }
    void postTheme({ theme: props.theme })
  }, [])

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
  }

  function toggleTheme (props: {
    debugLabel?: string
  }): void {
    console.log('handleChangeTheme', props.debugLabel)
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
    toggleTheme,
    darkened,
    mounted,
    shade: colorMode.colorMode
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
