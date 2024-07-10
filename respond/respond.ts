import { NextResponse } from 'next/server'

export default function respond <Body> (props: {
  body: Body
  options?: ResponseInit
}): NextResponse<Body> {
  const response = NextResponse.json(props.body, props.options)
  return response
}
