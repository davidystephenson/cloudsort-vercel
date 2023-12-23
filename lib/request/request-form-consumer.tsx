'use client'

import { FormEvent, ReactNode } from 'react'
import { useRequestContext } from './request-context'

export default function RequestFormConsumer ({
  children
}: {
  children: ReactNode
}): JSX.Element {
  const request = useRequestContext()
  function handleSubmit (event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    void request.send()
  }
  return (
    <form onSubmit={handleSubmit} suppressHydrationWarning>
      {children}
    </form>
  )
}
