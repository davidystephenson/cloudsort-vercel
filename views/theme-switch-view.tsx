'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'

export default function ThemeSwitchView (): JSX.Element {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme, resolvedTheme } = useTheme()
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
    console.log('newTheme', newTheme)
    if (newTheme === 'system') {
      console.log('systemTheme', systemTheme)
      if (systemTheme == null) {
        updateTheme('dark')
      } else {
        updateTheme(systemTheme)
      }
    } else {
      updateTheme(newTheme)
    }
  }

  function clickShade (shade: string): void {
    console.log('shade', shade)
    console.log('theme', theme)
    if (theme === shade) {
      console.log('theme === shade')
      changeTheme('system')
    } else {
      changeTheme(shade)
    }
  }

  function handleLight (): void {
    clickShade('light')
  }

  function handleDark (): void {
    clickShade('dark')
  }

  const buttonClasses = ['btn', 'join-item']
  const resolvedLight = resolvedTheme === 'light'
  const lightClassName = clsx(buttonClasses, 'btn-accent', !resolvedLight && 'btn-outline')
  const darkClassName = clsx(buttonClasses, resolvedLight ? 'btn-neutral btn-outline' : 'btn-neutral')

  return (
    <>
      <div className='join'>
        <button className={lightClassName} onClick={handleLight}>Light</button>
        <button className={darkClassName} onClick={handleDark}>Dark</button>
      </div>
    </>
  )
}
