import guardModel from '@/guard/guard-model'
import { RemoveMovieRequest } from './movie-types'
import guardNumber from '@/guard/guard-number'

export default function guardMovieRequest (props: {
  label: string
  value: unknown
}): RemoveMovieRequest {
  const guards = { listId: guardNumber, movieId: guardNumber }
  const guarded = guardModel({ guards, ...props })
  return guarded
}
