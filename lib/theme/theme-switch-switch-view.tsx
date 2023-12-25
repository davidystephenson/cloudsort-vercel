'use client'

import { Skeleton, Switch } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import { useTheme } from './theme-context'
import { MdLightMode, MdDarkMode } from 'react-icons/md'

export default function ThemeSwitchSwitchView (): JSX.Element {
  const theme = useTheme()
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

  const icon = theme.darkened ? <MdDarkMode /> : <MdLightMode />

  return (
    <Switch
      classNames={classNames}
      color='default'
      isSelected={theme.darkened}
      thumbIcon={icon}
      onClick={theme.handleChangeTheme}
    />
  )
}
