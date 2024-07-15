import guardNumber from '@/fashion-police/guard-number'
import { CalculatedMovie } from './movie-types'
import guardString from '@/fashion-police/guard-string'
import guardNumberUndefined from '@/fashion-police/guard-number-undefined'
import guardBoolean from '@/fashion-police/guard-boolean'
import fashionPolice from '@/fashion-police/fashion-police'

export default function guardCalculatedMovie (props: {
  label: string
  value: unknown
}): CalculatedMovie {
  const guarded = fashionPolice({
    required: {
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
