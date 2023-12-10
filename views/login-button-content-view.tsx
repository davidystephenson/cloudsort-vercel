'use client'

import LoadingDots from 'views/loading-dots'
import useStore from '@/lib/store'

export default function LoginButtonContentView (): JSX.Element {
  const loginLoading = useStore((state) => state.loginLoading)

  if (loginLoading) {
    return <LoadingDots color='#808080' />
  }

  return (
    <p>Sign In</p>
  )
}
