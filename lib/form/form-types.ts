import { RefObject } from 'react'

export interface Field {
  name: string
  value: string
  error?: string
  ref: RefObject<HTMLInputElement>
}

export type Fields = Record<string, Field | undefined>
