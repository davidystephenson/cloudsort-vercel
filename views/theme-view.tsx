'use client'

import DaisyUiThemeView from './daisy-ui-theme-view'
import { useEffect } from 'react'
import useStore from '@/lib/store'

export default function ThemeView ({
  children,
  shade
}: {
  children: React.ReactNode
  shade: string | undefined
}): JSX.Element {
  useEffect(() => {
    useStore.setState({ shade })
  }, [shade])

  return (
    <DaisyUiThemeView shade={shade}>
      {children}
    </DaisyUiThemeView>
  )
}
