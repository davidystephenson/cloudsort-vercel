import apiRespond from './api-respond'

export default function apiError (props: {
  message: string
  status: number
}): Response {
  return apiRespond({
    body: {
      error: props.message
    },
    options: {
      status: props.status
    }
  })
}
