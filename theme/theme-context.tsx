'use client'

import { useAuth } from '../auth/auth-context'
import useMounted from '../mounted/use-mounted'
import useSystemDark from '../use-system-dark/useSystemDark'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useColorMode } from '@chakra-ui/react'
import contextCreator from 'context-creator'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const {
  useContext: useTheme,
  Provider: ThemeProvider
} = contextCreator({
  name: 'theme',
  useValue: (props: {
    debug?: boolean
    shade?: string
    shadeCookie?: string
  }) => {
    const router = useRouter()
    const debug = props.debug ?? false
    const auth = useAuth()
    const mounted = useMounted()
    const [toggling, setToggling] = useState(false)
    const unshadedUser = useMemo(() => {
      return auth.session != null && auth.session.user.shade == null
    }, [auth.session])
    if (debug) {
      console.debug('mounted', mounted)
    }
    const colorMode = useColorMode()
    if (debug) {
      console.debug('colorMode', colorMode)
    }
    const systemDark = useSystemDark()
    if (debug) {
      console.debug('props.shade', props.shade)
    }
    const systemic = useMemo(() => {
      return props.shade == null
    }, [props.shade])
    if (debug) {
      console.debug('systemic', systemic)
    }
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
    if (debug) {
      console.debug('shade', shade)
    }
    const darkened = useMemo(() => {
      return shade === 'dark'
    }, [shade])
    if (debug) {
      console.debug('darkened', darkened)
    }
    const postShade = useCallback(async (props: {
      shade: string
    }) => {
      const body = JSON.stringify({ shade: props.shade })
      await axios.post('/api/shade', body)
      document.cookie = 'newShade=none;'
    }, [])
    const updateShade = useCallback((props: {
      shade: string
    }) => {
      document.cookie = `shade=${props.shade}`
      document.cookie = `newShade=${props.shade}; expires=0;`
      router.refresh()
      if (auth.session == null) {
        return
      }
      void postShade({ shade: props.shade })
    }, [auth.session, postShade])
    const toggleShade = useCallback(() => {
      setToggling(true)
      colorMode.toggleColorMode()
      if (darkened) {
        updateShade({ shade: 'light' })
      } else {
        updateShade({ shade: 'dark' })
      }
    }, [colorMode, darkened, updateShade])
    useEffect(() => {
      if (mounted && systemic) {
        if (systemDark) {
          void updateShade({ shade: 'dark' })
        } else {
          void updateShade({ shade: 'light' })
        }
      }
    }, [mounted, systemic, systemDark, updateShade])
    useEffect(() => {
      if (systemic) {
        const different = systemDark !== darkened
        if (different) {
          toggleShade()
        }
      } else {
        const different = props.shade !== shade
        if (different && !toggling) {
          toggleShade()
        }
      }
    }, [colorMode, darkened, props.shade, shade, systemic, systemDark])
    useEffect(() => {
      if (unshadedUser && shade != null) {
        void postShade({ shade })
      }
    }, [postShade, shade, unshadedUser])
    useEffect(() => {
      if (toggling) {
        setToggling(false)
      }
    }, [toggling])
    const borderColor = darkened
      ? 'var(--chakra-colors-gray-700)'
      : 'var(--chakra-colors-gray-100)'
    const colorScheme = darkened
      ? 'var(--chakra-colors-purple-200)'
      : 'var(--chakra-colors-purple-600)'
    const value = {
      colorScheme,
      borderColor,
      darkened,
      mounted,
      toggleShade
    }
    return value
  }
})
