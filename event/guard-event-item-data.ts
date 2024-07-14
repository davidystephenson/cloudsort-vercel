import guardModel from '@/guard/guard-model'
import { HistoryItemData } from '@/mergeChoice/mergeChoiceTypes'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import { ListMovie } from '@/movie/movie-types'

export default function guardEventItemData (props: {
  label: string
  value: unknown
}): HistoryItemData<ListMovie> {
  const guards = {
    item: guardCalculatedMovie
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
