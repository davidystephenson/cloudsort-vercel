'use client'

import { Input } from '@nextui-org/react'
import { useAuthFormContext } from './auth-form-context'

export default function AuthFormFieldsView (): JSX.Element {
  const authForm = useAuthFormContext()

  return (
    <>
      <Input
        autoComplete='email'
        color='primary'
        label='Email'
        onChange={authForm.handleChange}
        isRequired
        ref={authForm.emailRef}
        type='email'
        value={authForm.email}
        variant='underlined'
      />
      <Input
        autoComplete='current-password'
        color='primary'
        label='Password'
        onChange={authForm.handleChange}
        isRequired
        ref={authForm.passwordRef}
        type='password'
        value={authForm.password}
        variant='underlined'
      />
    </>
  )
}
