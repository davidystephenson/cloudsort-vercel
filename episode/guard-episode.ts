import guardNumber from '@/fashion-police/guard-number'
import { Episode } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import guardEpisodeItem from './guard-episode-item'
import guardEpisodeChoice from './guard-episode-choice'
import fashionPolice from '@/fashion-police/fashion-police'
import guardEpisodeImport from './guard-episode-import'
import guardEpisodeRandom from './guard-episode-random'

export default function guardEpisode (props: {
  label: string
  value: unknown
}): Episode<ListMovie> {
  const required = {
    createdAt: guardNumber,
    mergeChoiceId: guardNumber
  }
  const optional = {
    archive: guardEpisodeItem,
    choice: guardEpisodeChoice,
    import: guardEpisodeImport,
    random: guardEpisodeRandom,
    remove: guardEpisodeItem,
    reset: guardEpisodeItem,
    unarchive: guardEpisodeItem
  }
  const guarded = fashionPolice({
    required,
    optional,
    label: props.label,
    value: props.value
  })
  return guarded
}
