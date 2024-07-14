export default async function post <Request, Response> (props: {
  guard: (props: { label: string, value: unknown }) => Response
  label: string
  body: Request
  url: string
}): Promise<Response> {
  const payload = JSON.stringify(props.body)
  const options = {
    body: payload,
    method: 'POST'
  }
  const response = await fetch(props.url, options)
  const responsePayload: unknown = await response.json()
  const guarded = props.guard({
    label: props.label,
    value: responsePayload
  })
  return guarded
}
