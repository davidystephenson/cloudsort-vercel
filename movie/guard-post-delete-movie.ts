import { DeleteMovieBody } from './movie-types'
import guardObject from '@/guard/guard-object'
import guardNumberProp from '@/guard/guard-number-prop'

export default function guardPostDeleteMovie (props: {
  data: unknown
}): DeleteMovieBody {
  const data = guardObject({ data: props.data })
  console.log('data', data)
  const listId = guardNumberProp({ data, key: 'listId' })
  const movieId = guardNumberProp({ data, key: 'movieId' })
  return {
    listId,
    movieId
  }
}
