'use client'

import { useButtonContext } from '@/lib/button/button-context'

export default function ButtonLoadingView (): JSX.Element {
  const button = useButtonContext()
  if (button.loading) {
    return (
      <span className='loading loading-spinner' />
    )
  }
  return <></>
}
