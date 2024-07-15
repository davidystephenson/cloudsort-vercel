import guardModel from '@/guard/guard-model'
import { HistoryRandomData } from '@/mergeChoice/mergeChoiceTypes'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import { ListMovie } from '@/movie/movie-types'

export default function guardEventRandomData (props: {
  label: string
  value: unknown
}): HistoryRandomData<ListMovie> {
  const guards = {
    first: guardCalculatedMovie,
    second: guardCalculatedMovie
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}