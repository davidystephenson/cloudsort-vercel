import guardNumber from '@/guard/guard-number'
import { CalculatedMovie } from './movie-types'
import guardString from '@/guard/guard-string'
import guardNumberUndefined from '@/guard/guard-number-undefined'
import guardBoolean from '@/guard/guard-boolean'
import guardModel from '@/guard/guard-model'

export default function guardCalculatedMovie (props: {
  label: string
  value: unknown
}): CalculatedMovie {
  const guarded = guardModel({
    guards: {
      id: guardNumber,
      imdbId: guardString,
      name: guardString,
      points: guardNumber,
      seed: guardNumberUndefined,
      seeding: guardBoolean,
      url: guardString,
      year: guardNumber
    },
    label: props.label,
    value: props.value
  })
  return guarded
}
