'use client'

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useAuth } from './auth-context'
import { useRequest } from '../request/request-context'
import { MdLogout } from 'react-icons/md'
import ThemeButtonView from '../theme/theme-button-view'
import ThemeSwitchView from '../theme/theme-switch-view'
import { useTheme } from '../theme/theme-context'

export default function ProfileConsumer (): JSX.Element {
  const auth = useAuth()
  const request = useRequest()
  const theme = useTheme()

  if (auth.session == null) {
    throw new Error('There is no session')
  }
  function handleClick (): void {
    void request.send()
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <ThemeButtonView
          isLoading={request.loading}
          color='primary'
          size='sm'
          className='text-md'
        >
          {auth.session.user?.email}
        </ThemeButtonView>
      </DropdownTrigger>
      <DropdownMenu aria-label='Logout'>
        <DropdownItem
          key='theme'
          onClick={theme.handleChangeTheme}
          textValue='Change theme'
          color='primary'
        >
          <ThemeSwitchView />
        </DropdownItem>
        <DropdownItem
          key='logout'
          onClick={handleClick}
          startContent={<MdLogout />}
          color='primary'
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
