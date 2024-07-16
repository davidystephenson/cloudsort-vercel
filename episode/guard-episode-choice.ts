import guardBoolean from '@/fashion-police/guard-boolean'
import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import guardStringNumber from '@/fashion-police/guard-string-number'
import { EpisodeChoice } from '@/mergechoice/mergeChoiceTypes'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import { ListMovie } from '@/movie/movie-types'

export default function guardEpisodeChoice (props: {
  label: string
  value: unknown
}): EpisodeChoice<ListMovie> {
  const guards = {
    aBetter: guardBoolean,
    aId: guardStringNumber,
    aItem: guardCalculatedMovie,
    betterIndex: guardNumber,
    bId: guardStringNumber,
    bItem: guardCalculatedMovie,
    random: guardBoolean,
    seeded: guardBoolean
  }
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
