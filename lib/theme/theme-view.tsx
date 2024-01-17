'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@/lib/theme/theme-context'
import { ChakraProvider, ColorModeScript, Theme } from '@chakra-ui/react'
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'system'
  // useSystemColorMode: true
}
const theme = extendTheme({ config }) as Theme

export default function ThemeView (props: {
  children: ReactNode
  shade?: 'light' | 'dark'
}): JSX.Element {
  const shade = props.shade ?? theme.config.initialColorMode
  if (props.shade != null && global.window?.localStorage != null) {
    if (global.window.localStorage.getItem('chakra-ui-color-mode') !== shade) {
      global.window.localStorage.setItem('chakra-ui-color-mode', props.shade)
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider shade={shade}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
