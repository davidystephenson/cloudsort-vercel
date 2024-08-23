import { Guard } from '@/fashion-police/fashionPoliceTypes'
import guardOk from '@/ok/guard-ok'

export default async function post <Request, Response> (props: {
  guard: Guard<Response>
  label: string
  request: Request
  url: string
}): Promise<Response> {
  const payload = JSON.stringify(props.request)
  const options = {
    body: payload,
    method: 'POST'
  }
  const response = await fetch(props.url, options)
  const responsePayload: unknown = await response.json()
  const okGuarded = guardOk({
    label: props.label,
    value: responsePayload
  })
  if (!okGuarded.ok) {
    throw new Error(okGuarded.errorMessage)
  }
  const guarded = props.guard({
    label: props.label,
    value: responsePayload
  })
  return guarded
}
