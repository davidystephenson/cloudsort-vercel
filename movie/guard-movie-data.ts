import { MovieData } from './movie-types'
import guardString from '@/guard/guard-string'
import guardNumber from '@/guard/guard-number'
import guardModel from '@/guard/guard-model'
import guardBoolean from '@/guard/guard-boolean'
import guardNumberUndefined from '@/guard/guard-number-undefined'
import guardStringUndefined from '@/guard/guard-string-undefined'

export default function guardMovieData (props: {
  label: string
  value: unknown
}): MovieData {
  const guards = {
    name: guardString,
    score: guardNumber,
    imdbId: guardString,
    seed: guardNumberUndefined,
    seeding: guardBoolean,
    url: guardStringUndefined,
    year: guardNumber
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
