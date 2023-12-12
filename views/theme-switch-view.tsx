'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'

export default function ThemeSwitchView (): JSX.Element {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()
  const router = useRouter()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }

  function updateTheme (newTheme: string): void {
    setTheme(newTheme)
    document.cookie = `theme=${newTheme}`
    router.refresh()
  }

  function changeTheme (newTheme: string): void {
    if (newTheme === 'system') {
      if (systemTheme == null) {
        updateTheme('dark')
      } else {
        updateTheme(systemTheme)
      }
    } else {
      updateTheme(newTheme)
    }
  }

  return (
    <>
      <button className='btn btn-primary'>Primary</button>
      <select value={theme} onChange={e => changeTheme(e.target.value)}>
        <option value='system'>System</option>
        <option value='dark'>Dark</option>
        <option value='light'>Light</option>
      </select>
    </>
  )
}
