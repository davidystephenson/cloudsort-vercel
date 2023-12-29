import apiError from '../api/api-error'

export default function respondAuthError (): Response {
  return apiError({
    message: 'There is no session',
    status: 401
  })
}
