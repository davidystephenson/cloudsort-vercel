import fashionPolice from '@/fashion-police/fashion-police'
import { EpisodeItem } from '@/mergechoice/mergeChoiceTypes'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import { ListMovie } from '@/movie/movie-types'

export default function guardEpisodeItem (props: {
  label: string
  value: unknown
}): EpisodeItem<ListMovie> {
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
