'use client'

import { useAuth } from './auth-context'
import { useRequest } from '../request/request-context'
import { MdLogout } from 'react-icons/md'
import ThemeButtonView from '../theme/theme-button-view'
import ThemeSwitchView from '../theme/theme-switch-view'
import { useTheme } from '../theme/theme-context'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { MouseEvent } from 'react'

export default function ProfileConsumer (): JSX.Element {
  const auth = useAuth()
  const request = useRequest()
  const theme = useTheme()

  if (auth.session == null) {
    throw new Error('There is no session')
  }
  function handleLogout (): void {
    void request.send()
  }
  function handleToggleTheme (event: MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation()
    event.preventDefault()
    theme.toggleTheme({ debugLabel: 'ProfileConsumer' })
  }

  return (
    <Menu>
      <MenuButton
        as={ThemeButtonView}
        isLoading={request.loading}
      >
        {auth.session.user?.email}
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
