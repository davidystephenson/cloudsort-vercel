'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

export default function ThemeSwitchView (): JSX.Element {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()
  const router = useRouter()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  const lit = resolvedTheme === 'light'

  function updateTheme (newTheme: string): void {
    setTheme(newTheme)
    document.cookie = `theme=${newTheme}`
    router.refresh()
  }

  function changeTheme (): void {
    if (lit) {
      updateTheme('dark')
    } else {
      updateTheme('light')
    }
  }

  return (
    <>
      <label className='cursor-pointer label'>
        <span className='label-text'>Dark</span>
        <input
          type='checkbox'
          className='toggle toggle-primary'
          checked={lit}
          onChange={changeTheme}
        />
        <span className='label-text'>Light</span>
      </label>
    </>
  )
}
