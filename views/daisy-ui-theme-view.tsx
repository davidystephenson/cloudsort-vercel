'use client'

import getDaisyTheme from '@/lib/getDaisyTheme'
import { Theme } from 'react-daisyui'

export default function DaisyUiThemeView ({
  children,
  shade
}: {
  children: React.ReactNode
  shade: string | undefined
}): JSX.Element | null {
  const dataTheme = getDaisyTheme({ shade })

  return (
    <Theme dataTheme={dataTheme} className='container mx-auto'>
      {children}
    </Theme>
  )
}
