'use client'

import { Switch } from '@chakra-ui/react'
import { useTheme } from './theme-context'

export default function ThemeSwitchSwitchView (): JSX.Element {
  const theme = useTheme()
  const disabled = !theme.mounted

  return (
    <Switch isDisabled={disabled} isChecked={theme.darkened} />
  )
}
