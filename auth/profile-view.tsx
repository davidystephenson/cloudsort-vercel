'use client'

import { Box } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import { RequestProvider } from '../request/request-context'
import AuthLinksView from './auth-links-view'
import ProfileConsumer from './profile-consumer'

export default function ProfileView (): JSX.Element {
  return (
    <>
      <AuthLinksView />
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
