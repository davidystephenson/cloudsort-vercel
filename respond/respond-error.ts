import { NextResponse } from 'next/server'
import respond from './respond'
import { ErrorPayload } from '@/handle/handle-types'

export default function respondError (props: {
  message: string
  status: number
}): NextResponse<ErrorPayload> {
  const body = { ok: false, errorMessage: props.message } as const
  const options = { status: props.status }
  const response = respond({ body, options })
  return response
}
