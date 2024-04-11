import { PostDeleteMovieBody } from './movie-types'
import guardObject from '@/guard/guard-object'
import guardNumberProp from '@/guard/guard-number-prop'

export default function guardPostDeleteMovie (props: {
  label: string
  value: unknown
}): PostDeleteMovieBody {
  const data = guardObject({
    label: props.label,
    value: props.value
  })
  const listId = guardNumberProp({
    key: 'listId',
    label: props.label,
    value: data
  })
  const movieId = guardNumberProp({
    key: 'movieId',
    label: props.label,
    value: data
  })
  return {
    listId,
    movieId
  }
}
