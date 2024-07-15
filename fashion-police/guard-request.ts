import { Guard } from './fashionPoliceTypes'

export default async function guardRequest <Body> (props: {
  guard: Guard<Body>
  label: string
  request: Request
}): Promise<Body> {
  const data = await props.request.json()
  const body = props.guard({ label: props.label, value: data })
  return body
}
