import { RefObject } from 'react'

export interface Field {
  name: string
  value: string
  error?: string
  ref: RefObject<HTMLInputElement>
}

export type Fields = Record<string, Field | undefined>

export interface FormContextValue {
  deregister: (props: { name: string }) => void
  fields: Fields
  register: (props: { name: string, value?: string }) => void
  handleSubmit: () => void
  handleChange: () => void
}
