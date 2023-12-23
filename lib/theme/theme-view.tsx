'use client'

import { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useTheme } from './theme-context'
import ContainerView from './container-view'

export default function ThemeView (props: {
  children: ReactNode
}): JSX.Element {
  const theme = useTheme()
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <ContainerView shade={theme.shade}>
        {props.children}
      </ContainerView>
    </NextUIProvider>
  )
}
