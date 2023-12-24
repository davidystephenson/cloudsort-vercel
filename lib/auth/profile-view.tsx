'use client'

import { useAuth } from './auth-context'
import { signOut } from 'next-auth/react'
import ProfileConsumer from './profile-consumer'
import { RequestProvider } from '../request/request-context'
import ThemeLinkView from '../theme/theme-link-view'

export default function ProfileView (): JSX.Element {
  const auth = useAuth()

  if (auth.session == null) {
    return (
      <div className='flex gap-2'>
        <ThemeLinkView href='/login'>Login</ThemeLinkView>
        <ThemeLinkView href='/register'>Register</ThemeLinkView>
      </div>
    )
  }
  return (
    <RequestProvider
      send={signOut}
      endless
    >
      <ProfileConsumer />
    </RequestProvider>
  )
}
