import { MovieData } from './movie-types'
import guardString from '@/fashion-police/guard-string'
import guardNumber from '@/fashion-police/guard-number'
import fashionPolice from '@/fashion-police/fashion-police'
import guardBoolean from '@/fashion-police/guard-boolean'
import guardNumberUndefined from '@/fashion-police/guard-number-undefined'
import guardStringUndefined from '@/fashion-police/guard-string-undefined'

export default function guardMovieData (props: {
  label: string
  value: unknown
}): MovieData {
  const guards = {
    name: guardString,
    imdbId: guardString,
    seed: guardNumberUndefined,
    seeding: guardBoolean,
    url: guardStringUndefined,
    year: guardNumber
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
