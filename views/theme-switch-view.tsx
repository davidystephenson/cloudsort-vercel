'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '@/lib/store'
import { Switch } from '@nextui-org/react'

export default function ThemeSwitchView (): JSX.Element {
  const [mounted, setMounted] = useState(false)
  const shade = useStore(state => state.shade)
  const router = useRouter()
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <></>
  }
  const darkened = shade === 'dark'

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
    void postTheme({ theme })
  }

  function changeTheme (darkened: boolean): void {
    if (darkened) {
      updateTheme({ theme: 'dark' })
    } else {
      updateTheme({ theme: 'light' })
    }
  }

  return (
    <>
      <Switch isSelected={darkened} onValueChange={changeTheme} />
    </>
  )
}
