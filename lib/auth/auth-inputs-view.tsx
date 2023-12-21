'use client'

import { Button } from '@nextui-org/react'

export default function AuthInputsView ({
  authenticate,
  buttonContent,
  children,
  loading
}: {
  authenticate: ({ email, password }: { email: string, password: string }) => Promise<void>
  buttonContent: JSX.Element
  children: React.ReactNode
  loading: boolean
}): JSX.Element {
  function handleSubmit (e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    void authenticate({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='email'
          autoComplete='email'
          required
          className='input'
        />
      </div>
      <div>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='password'
          required
          className='input'
        />
      </div>
      {children}

      <Button
        isLoading={loading}
        type='submit'
      >
        {buttonContent}
      </Button>
    </form>
  )
}
