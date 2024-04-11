import { MovieData } from './movie-types'
import guardNumberProp from '@/guard/guard-number-prop'
import guardStringProp from '@/guard/guard-string-prop'
import guardStringNullProp from '@/guard/guard-string-null-prop'

export default function guardMovieData (props: {
  label: string
  value: object
}): MovieData {
  const name = guardStringProp({
    key: 'name',
    label: props.label,
    value: props.value
  })
  const score = guardNumberProp({
    key: 'score',
    label: props.label,
    value: props.value
  })
  const imdbId = guardStringProp({
    key: 'imdbId',
    label: props.label,
    value: props.value
  })
  const review = guardStringNullProp({
    key: 'review',
    label: props.label,
    value: props.value
  })
  const url = guardStringNullProp({
    value: props.value,
    label: props.label,
    key: 'url'
  })
  const year = guardNumberProp({
    key: 'year',
    label: props.label,
    value: props.value
  })
  return {
    name,
    score,
    imdbId,
    review,
    url,
    year
  }
}
