import { NextResponse } from 'next/server'

export default function apiRespond (props: {
  body: unknown
  options?: ResponseInit
}): Response {
  return NextResponse.json(props.body, props.options)
}
