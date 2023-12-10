'use client'

import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'

export default function ThemeView ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <ThemeProvider attribute='class'>
      <Theme>
        {children}
      </Theme>
    </ThemeProvider>
  )
}
