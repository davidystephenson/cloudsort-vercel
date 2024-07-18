import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import { EpisodeArchive } from '@/mergechoice/mergeChoiceTypes'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import { ListMovie } from '@/movie/movie-types'

export default function guardEpisodeArchive (props: {
  label: string
  value: unknown
}): EpisodeArchive<ListMovie> {
  const guards = {
    item: guardCalculatedMovie,
    listId: guardNumber,
    lastMergechoiceId: guardNumber
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
