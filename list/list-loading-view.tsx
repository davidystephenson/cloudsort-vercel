'use client'

import themeContext from '@/theme/theme-context'
import { useListContext } from './list-context'
import { Spinner } from '@chakra-ui/react'

export default function ListLoadingView (): JSX.Element {
  const list = useListContext()
  const theme = themeContext.useContext()
  const loadingStyle = {
    borderBottom: `1px solid ${theme.borderColor}`,
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    gap: '0.5rem'
  }
  const headingStyle = {
    fontSize: '1.875rem',
    fontWeight: '700',
    lineHeight: '1.2'
  }
  return (
    <div style={loadingStyle}>
      <h2 style={headingStyle}>{list.name}</h2>
      <Spinner />
    </div>
  )
}
