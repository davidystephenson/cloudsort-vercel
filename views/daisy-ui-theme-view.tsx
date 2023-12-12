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
  console.log('shade', shade)
  const dataTheme = getDaisyTheme({ shade })
  console.log('dataTheme', dataTheme)

  return (
    <Theme dataTheme={dataTheme}>
      {children}
    </Theme>
  )
}
