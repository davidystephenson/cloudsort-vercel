'use client'
import { signOut } from 'next-auth/react'
import SendRequestView from '../request/send-request-view'

export default function LogoutView (): JSX.Element {
  return (
    <SendRequestView
      send={signOut}
      endless
    >
      Logout
    </SendRequestView>
  )
}
