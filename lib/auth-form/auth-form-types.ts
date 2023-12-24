import { RefObject } from 'react'

export interface AuthFormContextValue {
  email: string
  emailRef: RefObject<HTMLInputElement>
  handleChange: () => void
  password: string
  passwordRef: RefObject<HTMLInputElement>
  send: () => Promise<void>
}
