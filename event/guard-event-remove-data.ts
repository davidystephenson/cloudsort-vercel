import fashionPolice from '@/fashion-police/fashion-police'
import { HistoryRemoveData } from '@/mergeChoice/mergeChoiceTypes'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import { ListMovie } from '@/movie/movie-types'

export default function guardEventRemoveData (props: {
  label: string
  value: unknown
}): HistoryRemoveData<ListMovie> {
  const guards = {
    item: guardCalculatedMovie
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
