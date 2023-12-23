'use client'

import ThemeSwitchSwitchView from './theme-switch-switch-view'

export default function ThemeSwitchView (): JSX.Element {
  return (
    <div className='flex items-center'>
      <span>Light</span>
      <ThemeSwitchSwitchView />
      <span>Dark</span>
    </div>
  )
}
