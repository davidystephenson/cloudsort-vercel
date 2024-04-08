import { NextResponse } from 'next/server'

export default function respond (props: {
  body: unknown
  options?: ResponseInit
}): Response {
  return NextResponse.json(props.body, props.options)
}
