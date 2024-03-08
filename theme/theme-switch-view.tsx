'use client'

import { Box, HStack } from '@chakra-ui/react'
import ThemeSwitchSwitchView from './theme-switch-switch-view'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

export default function ThemeSwitchView (): JSX.Element {
  return (
    <HStack>
      <Box>
        Light
      </Box>
      <MdLightMode />
      <ThemeSwitchSwitchView />
      <MdDarkMode />
      <Box>
        Dark
      </Box>
    </HStack>
  )
}
