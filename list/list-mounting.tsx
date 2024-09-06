'use client'

import { useTheme } from '@/theme/theme-context'
import { ReactNode } from 'react'
import ListMultiloaderView from './list-multiloader-view'

export default function ListMounting (props: {
  children: ReactNode
}): JSX.Element {
  const theme = useTheme()
  if (!theme.mounted) {
    return <ListMultiloaderView />
  }
  return <>{props.children}</>
}
