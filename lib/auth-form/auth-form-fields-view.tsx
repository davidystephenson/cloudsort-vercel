'use client'

import { useAuthFormContext } from './auth-form-context'

export default function AuthFormFieldsView (): JSX.Element {
  const authForm = useAuthFormContext()

  return (
    <>
      <div>
        <input
          autoComplete='email'
          className='input'
          onChange={authForm.handleChange}
          placeholder='email'
          ref={authForm.emailRef}
          required
          value={authForm.email}
          type='email'
        />
      </div>
      <div>
        <input
          autoComplete='current-password'
          className='input'
          onChange={authForm.handleChange}
          placeholder='password'
          ref={authForm.passwordRef}
          required
          type='password'
          value={authForm.password}
        />
      </div>
    </>
  )
}
