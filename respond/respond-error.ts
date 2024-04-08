import respond from './respond'

export default function respondError (props: {
  message: string
  status: number
}): Response {
  return respond({
    body: {
      error: props.message
    },
    options: {
      status: props.status
    }
  })
}
