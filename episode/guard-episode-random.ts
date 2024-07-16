import fashionPolice from '@/fashion-police/fashion-police'
import { EpisodeRandom } from '@/mergechoice/mergeChoiceTypes'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import { ListMovie } from '@/movie/movie-types'

export default function guardEpisodeRandom (props: {
  label: string
  value: unknown
}): EpisodeRandom<ListMovie> {
  const guards = {
    first: guardCalculatedMovie,
    second: guardCalculatedMovie
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
