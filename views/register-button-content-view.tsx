'use client'

import LoadingDots from 'views/loading-dots'
import useStore from '@/lib/store'

export default function RegisterButtonContentView (): JSX.Element {
  const registerLoading = useStore((state) => state.register.loading)

  if (registerLoading) {
    return <LoadingDots color='#808080' />
  }

  return (
    <p>Register</p>
  )
}
