'use client'

import ContainerView from './container-view'
import { useEffect } from 'react'
import useStore from '@/lib/store'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function ThemeView ({
  children,
  shade
}: {
  children: React.ReactNode
  shade: string | undefined
}): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ shade })
  }, [shade])

  return (
    <NextUIProvider navigate={router.push}>
      <ContainerView shade={shade}>
        {children}
      </ContainerView>
    </NextUIProvider>
  )
}
