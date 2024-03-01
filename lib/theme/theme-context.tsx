'use client'

import { useAuth } from '../auth/auth-context'
import useMounted from '../mounted/use-mounted'
import useSystemDark from '../use-system-dark/useSystemDark'
import { useCallback, useEffect, useMemo } from 'react'
import { useColorMode } from '@chakra-ui/react'
import contextCreator from 'context-creator'
import axios from 'axios'

export const {
  useContext: useTheme,
  Provider: ThemeProvider
} = contextCreator({
  name: 'theme',
  useValue: (props: {
    shade?: string
  }) => {
    const auth = useAuth()
    const mounted = useMounted()
    const colorMode = useColorMode()
    const systemDark = useSystemDark()
    const systemic = useMemo(() => {
      return props.shade === 'system'
    }, [props.shade])
    const themeMode = useMemo(() => {
      if (mounted) {
        return colorMode.colorMode
      }
      return props.shade
    }, [props.shade, mounted, colorMode.colorMode])
    const shade = useMemo(() => {
      if (systemic) {
        if (systemDark) {
          return 'dark'
        }
        return 'light'
      }
      return themeMode
    }, [props.shade, themeMode, systemDark])
    const darkened = useMemo(() => {
      return shade === 'dark'
    }, [shade])
    const postTheme = useCallback(async (props: {
      theme: string
    }) => {
      const body = JSON.stringify({ theme: props.theme })
      await axios.post('/api/theme', body)
    }, [])
    useEffect(() => {
      if (mounted && systemic && auth.session != null) {
        if (systemDark) {
          void postTheme({ theme: 'dark' })
        } else {
          void postTheme({ theme: 'light' })
        }
      }
    }, [mounted, systemic, systemDark, postTheme, auth.session])
    useEffect(() => {
      if (auth.session?.user.theme == null) {
        const different = systemDark !== darkened
        if (different) {
          colorMode.toggleColorMode()
        }
      } else {
        const different = auth.session.user.theme !== shade
        if (different) {
          colorMode.toggleColorMode()
        }
      }
    }, [auth.session, colorMode, darkened, shade, systemDark])

    function updateTheme (props: {
      theme: string
    }): void {
      colorMode.toggleColorMode()
      if (auth.session == null) {
        return
      }
      void postTheme({ theme: props.theme })
    }

    function toggleTheme (props: {
      debugLabel?: string
    }): void {
      if (!mounted) {
        return
      }
      if (darkened) {
        updateTheme({ theme: 'light' })
      } else {
        updateTheme({ theme: 'dark' })
      }
    }
    const borderColor = darkened ? 'var(--chakra-colors-gray-700)' : 'var(--chakra-colors-gray-100)'
    const value = {
      borderColor,
      darkened,
      mounted,
      colorMode: colorMode.colorMode,
      toggleTheme
    }
    return value
  }
})
