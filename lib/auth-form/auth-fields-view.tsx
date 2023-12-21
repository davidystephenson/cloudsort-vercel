'use client'

import { useAuthFormContext } from './auth-form-context'

export default function AuthFieldsView (): JSX.Element {
  const authForm = useAuthFormContext()

  return (
    <>
      <div>
        <input
          id='email'
          name='email'
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
          id='password'
          name='password'
          type='password'
          placeholder='password'
          required
          className='input'
          onChange={authForm.handlePasswordChange}
          value={authForm.password}
        />
      </div>
    </>
  )
}
