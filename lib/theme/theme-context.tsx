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
      return props.shade == null
    }, [props.shade])
    console.log('mounted', mounted)
    console.log('props.shade', props.shade)
    console.log('colorMode', colorMode)
    const shade = useMemo(() => {
      if (mounted) {
        return colorMode.colorMode
      }
      if (systemic) {
        if (systemDark) {
          return 'dark'
        }
        return 'light'
      }
      return props.shade
    }, [colorMode.colorMode, mounted, props.shade, systemic, systemDark])
    console.log('shade', shade)
    const darkened = useMemo(() => {
      return shade === 'dark'
    }, [shade])
    console.log('darkened', darkened)
    const postShade = useCallback(async (props: {
      shade: string
    }) => {
      const body = JSON.stringify({ theme: props.shade })
      await axios.post('/api/theme', body)
    }, [])
    const updateShade = useCallback((props: {
      shade: string
    }) => {
      document.cookie = `shade=${props.shade}`
      if (auth.session == null) {
        return
      }
      void postShade({ shade: props.shade })
    }, [auth.session, postShade])
    useEffect(() => {
      if (mounted && systemic) {
        if (systemDark) {
          void updateShade({ shade: 'dark' })
        } else {
          void updateShade({ shade: 'light' })
        }
      }
    }, [mounted, systemic, systemDark, updateShade, auth.session])
    useEffect(() => {
      if (systemic) {
        const different = systemDark !== darkened
        if (different) {
          colorMode.toggleColorMode()
        }
      } else {
        const different = props.shade !== shade
        if (different) {
          colorMode.toggleColorMode()
        }
      }
    }, [colorMode, darkened, props.shade, shade, systemic, systemDark])

    function toggleTheme (props: {
      debugLabel?: string
    }): void {
      if (!mounted) {
        return
      }
      colorMode.toggleColorMode()
      if (darkened) {
        updateShade({ shade: 'light' })
      } else {
        updateShade({ shade: 'dark' })
      }
    }
    const borderColor = darkened
      ? 'var(--chakra-colors-gray-700)'
      : 'var(--chakra-colors-gray-100)'
    const value = {
      borderColor,
      darkened,
      mounted,
      toggleTheme
    }
    console.log('theme value', value)
    return value
  }
})
