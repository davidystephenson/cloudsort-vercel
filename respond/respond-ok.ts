import respond from './respond'

export default function respondOk (): Response {
  const body = { ok: true }
  return respond({ body })
}
