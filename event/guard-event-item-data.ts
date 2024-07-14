import { ListMovie } from '@/movie/movie-types'
import { HistoryItemData } from './guard-history-event'
import guardModel from '@/guard/guard-model'
import guardMovie from '@/movie/guard-movie'

export default function guardEventItemData (props: {
  label: string
  value: unknown
}): HistoryItemData<ListMovie> {
  const guards = {
    item: guardMovie
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
