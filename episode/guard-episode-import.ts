import fashionPolice from '@/fashion-police/fashion-police'
import { EpisodeImport } from '@/mergechoice/mergeChoiceTypes'
import guardCalculatedMovieArray from '@/movie/guard-calculated-movie-array'
import { ListMovie } from '@/movie/movie-types'

export default function guardEpisodeImport (props: {
  label: string
  value: unknown
}): EpisodeImport<ListMovie> {
  const guards = {
    items: guardCalculatedMovieArray
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
