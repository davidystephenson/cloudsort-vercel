'use client'

import { ComponentProps, FormEvent } from 'react'
import { useRequest } from './request-context'

export default function RequestFormConsumer (props: ComponentProps<'form'>): JSX.Element {
  const request = useRequest()
  function handleSubmit (event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    void request.send()
  }
  return (
    <form onSubmit={handleSubmit} suppressHydrationWarning {...props} />
  )
}
