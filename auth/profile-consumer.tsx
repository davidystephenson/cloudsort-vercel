'use client'

import { useRequest } from '../request/request-context'
import { MdLogout } from 'react-icons/md'
import ThemeSwitchView from '../theme/theme-switch-view'
import { useTheme } from '../theme/theme-context'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { MouseEvent } from 'react'
import ProfileLabel from './profile-label'
import ThemeButtonView from '../theme/theme-button-view'

export default function ProfileConsumer (): JSX.Element {
  const request = useRequest()
  const theme = useTheme()

  function handleLogout (): void {
    void request.send()
  }
  function handleToggleTheme (event: MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation()
    event.preventDefault()
    theme.toggleShade()
  }

  return (
    <Menu>
      <MenuButton
        as={ThemeButtonView}
        isLoading={request.acting}
      >
        <ProfileLabel />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={handleToggleTheme}>
          <ThemeSwitchView />
        </MenuItem>
        <MenuItem
          icon={<MdLogout />}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
