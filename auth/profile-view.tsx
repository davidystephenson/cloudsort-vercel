'use client'

import { useAuth } from './auth-context'
import { signOut } from 'next-auth/react'
import ProfileConsumer from './profile-consumer'
import { RequestProvider } from '../request/request-context'
import ThemeLinkView from '../theme/theme-link-view'
import { Box, HStack } from '@chakra-ui/react'

export default function ProfileView (): JSX.Element {
  const auth = useAuth()

  return (
    <>
      <HStack>
        <ThemeLinkView href='/login'>Login</ThemeLinkView>
        <ThemeLinkView href='/register'>Register</ThemeLinkView>
      </HStack>
      <Box zIndex={4}>
        <RequestProvider
          send={signOut}
          endless
        >
          <ProfileConsumer />
        </RequestProvider>
      </Box>
    </>
  )
}
