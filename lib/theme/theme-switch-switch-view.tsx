'use client'

import { Skeleton, Switch } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { useTheme } from './theme-context'
import { useRouter } from 'next/navigation'
import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { useAuth } from '../auth/auth-context'

export default function ThemeSwitchSwitchView (): JSX.Element {
  const auth = useAuth()
  const theme = useTheme()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  const classNames = { wrapper: 'ml-2' }
  if (!mounted) {
    return (
      <>
        <Skeleton
          className='rounded-full w-fit h-7 ml-2 mr-2'
        >
          <Switch
            classNames={{ wrapper: 'ml-0 mr-0' }}
          />
        </Skeleton>
      </>
    )
  }
  const darkened = theme.shade === 'dark'

  async function postTheme ({ theme }: {
    theme: string
  }): Promise<void> {
    const body = JSON.stringify({ theme })
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    }
    await fetch('/api/theme', options)
    document.cookie = 'newTheme=none;'
  }

  function updateTheme ({ theme }: {
    theme: string
  }): void {
    document.cookie = `theme=${theme};`
    document.cookie = `newTheme=${theme}; expires=0;`
    router.refresh()
    if (auth.session == null) {
      return
    }
    void postTheme({ theme })
  }

  function changeTheme (darkened: boolean): void {
    if (darkened) {
      updateTheme({ theme: 'dark' })
    } else {
      updateTheme({ theme: 'light' })
    }
  }

  const icon = darkened ? <MdDarkMode /> : <MdLightMode />

  return (
    <Switch
      classNames={classNames}
      color='primary'
      isSelected={darkened}
      onValueChange={changeTheme}
      thumbIcon={icon}
    />
  )
}
