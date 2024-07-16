import fashionPolice from '@/fashion-police/fashion-police'
import { HistoryItemData } from '@/mergeChoice/mergeChoiceTypes'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import { ListMovie } from '@/movie/movie-types'

export default function guardEpisodeItemData (props: {
  label: string
  value: unknown
}): HistoryItemData<ListMovie> {
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
