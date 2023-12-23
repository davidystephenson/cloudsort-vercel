import { ReactNode } from 'react'
import AuthStatus from '../auth/auth-status'
import ThemeSwitchView from './theme-switch-view'
import { ThemeProvider } from '@/lib/theme/theme-context'
import ThemeConsumer from '@/lib/theme/theme-consumer'

export default function ThemeView ({
  children,
  shade
}: {
  children: ReactNode
  shade?: string
}): JSX.Element {
  return (
    <ThemeProvider shade={shade}>
      <ThemeConsumer>
        <ThemeSwitchView />
        {/* @ts-expect-error Async Server Component */}
        <AuthStatus />
        {children}
      </ThemeConsumer>
    </ThemeProvider>
  )
}
