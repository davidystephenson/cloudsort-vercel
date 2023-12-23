'use client'

import { useAuthFormContext } from './auth-form-context'

export default function AuthFieldsView (): JSX.Element {
  const authForm = useAuthFormContext()

  return (
    <>
      <div>
        <input
          type='email'
          placeholder='email'
          autoComplete='email'
          required
          className='input'
          onChange={authForm.handleEmailChange}
          value={authForm.email}
        />
      </div>
      <div>
        <input
          type='password'
          placeholder='password'
          autoComplete='current-password'
          required
          className='input'
          onChange={authForm.handlePasswordChange}
          value={authForm.password}
        />
      </div>
    </>
  )
}
