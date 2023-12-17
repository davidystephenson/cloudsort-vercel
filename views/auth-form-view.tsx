'use client'

import clsx from 'clsx'

export default function AuthFormView ({
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

  const buttonLoadingClass = loading && 'btn-disabled'
  const buttonClass = clsx(
    'btn btn-primary',
    buttonLoadingClass
  )

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
      <button
        disabled={loading}
        className={buttonClass}
      >
        {buttonContent}
      </button>
    </form>
  )
}
