'use client'

import { ThemeProvider } from 'next-themes'
import DaisyUiThemeView from './daisy-ui-theme-view'

export default function ThemeView ({
  children,
  themeCookie
}: {
  children: React.ReactNode
  themeCookie: string | undefined
}): JSX.Element {
  return (
    <ThemeProvider attribute='class' defaultTheme={themeCookie}>
      <DaisyUiThemeView shade={themeCookie}>
        {children}
      </DaisyUiThemeView>
    </ThemeProvider>
  )
}
