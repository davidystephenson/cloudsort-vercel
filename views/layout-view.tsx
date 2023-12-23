import { ReactNode } from 'react'
import AuthStatus from '../lib/auth/auth-status'
import ThemeSwitchView from '../lib/theme/theme-switch-view'
import { ThemeProvider } from '@/lib/theme/theme-context'
import ThemeView from '@/lib/theme/theme-view'

export default function LayoutView ({
  children,
  shade
}: {
  children: ReactNode
  shade?: string
}): JSX.Element {
  return (
    <ThemeProvider shade={shade}>
      <ThemeView>
        <ThemeSwitchView />
        {/* @ts-expect-error Async Server Component */}
        <AuthStatus />
        {children}
      </ThemeView>
    </ThemeProvider>
  )
}
