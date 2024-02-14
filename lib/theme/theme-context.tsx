'use client'

import { useAuth } from '../auth/auth-context'
import useMounted from '../mounted/use-mounted'
import useSystemDark from '../use-system-dark/useSystemDark'
import { useEffect, useMemo } from 'react'
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
    console.log('props.shade', props.shade)
    const auth = useAuth()
    const mounted = useMounted()
    console.log('mounted', mounted)
    const colorMode = useColorMode()
    console.log('colorMode', colorMode)
    const systemDark = useSystemDark()
    // const systemic = colorMode.colorMode === 'system
    // ? systemDark
    //   ? 'dark'
    //   : 'light'
    // : props.shade
    const shade = useMemo(() => {
      if (mounted) {
        return colorMode.colorMode
      }
      return props.shade
    }, [props.shade, mounted, colorMode.colorMode])
    console.log('shade', shade)
    const darkened = useMemo(() => {
      return shade === 'dark'
    }, [shade])

    useEffect(() => {
      const different = systemDark !== darkened
      if (different && auth.session?.user.theme == null) {
        colorMode.toggleColorMode()
      }
    }, [auth.session, colorMode, darkened, systemDark])

    async function postTheme ({ theme }: {
      theme: string
    }): Promise<void> {
      const body = JSON.stringify({ theme })
      const response = await axios.post('/api/theme', body)
      console.log('response.data', response.data)
    }

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
