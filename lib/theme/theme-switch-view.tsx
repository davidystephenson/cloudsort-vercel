'use client'

import { cn } from '@nextui-org/react'
import { useTheme } from './theme-context'
import ThemeSwitchSwitchView from './theme-switch-switch-view'

export default function ThemeSwitchView (): JSX.Element {
  const theme = useTheme()
  console.log('theme', theme)
  const darkClass = cn(theme.darkened && 'text-primary')
  const lightClass = cn(!theme.darkened && 'text-primary')
  return (
    <div
      className='flex items-center'
    >
      <span className={lightClass}>
        Light
      </span>
      <ThemeSwitchSwitchView />
      <span className={darkClass}>
        Dark
      </span>
    </div>
  )
}
