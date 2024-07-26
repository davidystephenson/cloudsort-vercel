'use client'

import { HStack, Heading } from '@chakra-ui/react'
import ProfileView from '../auth/profile-view'
import ThemeLinkView from '../theme/theme-link-view'

export default function NavbarLayoutView (): JSX.Element {
  return (
    <HStack justifyContent='space-between' mt='10px'>
      <ThemeLinkView href='/lists'>
        <Heading>Cloudsort</Heading>
      </ThemeLinkView>
      <ProfileView />
    </HStack>
  )
}
