'use client'
import { signOut } from 'next-auth/react'

export default function SignOutView (): JSX.Element {
  function handleClick (): void {
    void signOut()
  }
  return (
    <button
      className='text-stone-400 hover:text-stone-200 transition-all'
      onClick={handleClick}
    >
      Goddammit, sign me out!
    </button>
  )
}
