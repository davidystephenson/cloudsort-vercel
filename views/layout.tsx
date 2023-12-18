import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import AuthStatus from './auth-status'
import ThemeView from './theme-view'
import ThemeSwitchView from './theme-switch-view'

export default function LayoutView ({
  children,
  shade
}: {
  children: ReactNode
  shade?: string
}): JSX.Element {
  return (
    <ThemeView shade={shade}>
      <ThemeSwitchView />
      <Toaster />
      {/* @ts-expect-error Async Server Component */}
      <AuthStatus />
      {children}
    </ThemeView>
  )
}
