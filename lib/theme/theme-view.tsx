'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@/lib/theme/theme-context'
import { useRouter } from 'next/navigation'
import { NextUIProvider } from '@nextui-org/react'

export default function ThemeView ({
  children,
  shade
}: {
  children: ReactNode
  shade?: string
}): JSX.Element {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <ThemeProvider shade={shade}>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  )
}
