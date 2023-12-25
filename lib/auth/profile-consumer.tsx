'use client'

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useAuth } from './auth-context'
import { useRequest } from '../request/request-context'
import { MdLogout } from 'react-icons/md'
import ThemeButtonView from '../theme/theme-button-view'

export default function ProfileConsumer (): JSX.Element {
  const auth = useAuth()
  const request = useRequest()

  if (auth.session == null) {
    return (
      <p>Login</p>
    )
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
          key='logout'
          onClick={handleClick}
          startContent={<MdLogout />}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
