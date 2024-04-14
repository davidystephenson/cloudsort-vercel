import { PostChooseMovieBody } from './movie-types'
import guardObject from '@/guard/guard-object'
import guardNumberProp from '@/guard/guard-number-prop'
import guardStringNumberProp from '@/guard/guard-string-number-prop'

export default function guardPostChooseMovie (props: {
  label: string
  value: unknown
}): PostChooseMovieBody {
  const data = guardObject({
    label: props.label,
    value: props.value
  })
  const betterIndex = guardNumberProp({
    key: 'betterIndex',
    label: props.label,
    value: data
  })
  const listId = guardNumberProp({
    key: 'listId',
    label: props.label,
    value: data
  })
  const movieId = guardStringNumberProp({
    key: 'movieId',
    label: props.label,
    value: data
  })
  return {
    betterIndex,
    listId,
    movieId
  }
}
