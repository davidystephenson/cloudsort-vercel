'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@/lib/theme/theme-context'
import { ChakraProvider, ColorModeScript, Theme } from '@chakra-ui/react'
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'system'
}
const theme = extendTheme({ config }) as Theme

export default function ThemeView (props: {
  children: ReactNode
  shade?: 'light' | 'dark'
}): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider shade={props.shade}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {props.children}
      </ThemeProvider>
    </ChakraProvider>
  )
}
