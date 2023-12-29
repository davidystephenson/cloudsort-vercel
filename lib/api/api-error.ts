import apiResponse from './api-response'

export default function apiError (props: {
  message: string
  status: number
}): Response {
  return apiResponse({
    body: {
      error: props.message
    },
    options: {
      status: props.status
    }
  })
}
