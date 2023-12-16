import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import AuthStatus from './auth-status'
import ThemeView from './theme-view'

export default function LayoutView ({
  children,
  themeCookie
}: {
  children: ReactNode
  themeCookie?: string
}): JSX.Element {
  return (
    <ThemeView themeCookie={themeCookie}>
      <Toaster />
      {/* @ts-expect-error Async Server Component */}
      <AuthStatus />
      {children}
    </ThemeView>
  )
}
