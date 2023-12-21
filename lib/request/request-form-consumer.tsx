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
    console.log('handleSubmit')
    event.preventDefault()
    void request.send()
  }
  console.log('request', request)
  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
