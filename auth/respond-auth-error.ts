import respondError from '../respond/respond-error'

export default function respondAuthError (): Response {
  return respondError({
    message: 'There is no session',
    status: 401
  })
}
