'use client'

import { Switch } from '@nextui-org/react'
import { useTheme } from './theme-context'
import { MdLightMode, MdDarkMode } from 'react-icons/md'

export default function ThemeSwitchSwitchView (): JSX.Element {
  const theme = useTheme()
  const classNames = { wrapper: 'ml-2' }
  const disabled = !theme.mounted

  const icon = theme.darkened ? <MdDarkMode /> : <MdLightMode />

  return (
    <Switch
      classNames={classNames}
      color='default'
      isDisabled={disabled}
      isSelected={theme.darkened}
      thumbIcon={icon}
      onClick={theme.handleChangeTheme}
    />
  )
}
