'use client'
import ThemeLinkableView from '@/lib/theme/theme-linkable-view'
import { Text } from '@chakra-ui/react'

export default function Home (): JSX.Element {
  return (
    <>
      <Text>
        Sort your <ThemeLinkableView href='/lists'>lists</ThemeLinkableView>
      </Text>
    </>
  )
}
