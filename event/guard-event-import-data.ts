import guardModel from '@/guard/guard-model'
import { HistoryImportData } from '@/mergeChoice/mergeChoiceTypes'
import guardCalculatedMovieArray from '@/movie/guard-calculated-movie-array'
import { ListMovie } from '@/movie/movie-types'

export default function guardEventImportData (props: {
  label: string
  value: unknown
}): HistoryImportData<ListMovie> {
  const guards = {
    items: guardCalculatedMovieArray
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
