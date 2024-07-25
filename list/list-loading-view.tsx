'use client'

import themeContext from '@/theme/theme-context'
import { Heading, HStack, Spinner } from '@chakra-ui/react'
import { useListContext } from './list-context'

export default function ListLoadingView (): JSX.Element {
  const list = useListContext()
  const theme = themeContext.useContext()
  const loadingStyle = {
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: '10px'
  }
  return (
    <div style={loadingStyle}>
      <HStack>
        <Heading size='lg'>{list.name}</Heading>
        <Spinner />
      </HStack>
    </div>
  )
}
