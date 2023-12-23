'use client'

import { ReactNode } from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import ContainerView from './container-view'

export default function ThemeConsumer (props: {
  children: ReactNode
}): JSX.Element {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <ContainerView>
        {props.children}
      </ContainerView>
    </NextUIProvider>
  )
}
