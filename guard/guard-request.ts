export default async function guardRequest <Body> (props: {
  guard: (props: {
    label: string
    value: unknown
  }) => Body
  guardLabel: string
  request: Request
}): Promise<Body> {
  const data = await props.request.json()
  const body = props.guard({ label: props.guardLabel, value: data })
  return body
}
