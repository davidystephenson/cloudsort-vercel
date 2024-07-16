import fashionPolice from '@/fashion-police/fashion-police'
import { EpisodeRemove } from '@/mergechoice/mergeChoiceTypes'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import { ListMovie } from '@/movie/movie-types'

export default function guardEpisodeRemove (props: {
  label: string
  value: unknown
}): EpisodeRemove<ListMovie> {
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
