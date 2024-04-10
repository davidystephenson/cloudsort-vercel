import { MovieData } from './movie-types'
import guardNumberProp from '@/guard/guard-number-prop'
import guardStringProp from '@/guard/guard-string-prop'
import guardStringNullProp from '@/guard/guard-string-null-prop'

export default function guardMovieData (props: {
  data: object
}): MovieData {
  const name = guardStringProp({ data: props.data, key: 'name' })
  const score = guardNumberProp({ data: props.data, key: 'score' })
  const imdbId = guardStringProp({ data: props.data, key: 'imdbId' })
  const review = guardStringNullProp({ data: props.data, key: 'review' })
  const url = guardStringNullProp({ data: props.data, key: 'url' })
  const year = guardNumberProp({ data: props.data, key: 'year' })
  return {
    name,
    score,
    imdbId,
    review,
    url,
    year
  }
}
