import { ReactNode } from 'react'
import ThemeSwitchView from '../theme/theme-switch-view'
import AuthStatusView from '../auth/auth-status-view'
import LogoutView from '../auth/logout-view'

export default async function LayoutView (props: {
  children: ReactNode
}): Promise<JSX.Element | null> {
  return (
    <div className='container mx-auto'>
      <h1 className='text-xl'>Cloudsort</h1>
      <ThemeSwitchView />
      {/* @ts-expect-error Async Server Component */}
      <AuthStatusView />
      <LogoutView />
      {props.children}
    </div>
  )
}
