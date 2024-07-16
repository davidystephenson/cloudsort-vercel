import guardNumber from '@/fashion-police/guard-number'
import { Episode } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import guardEpisodeItemData from './guard-event-item-data'
import guardEpisodeChoiceData from './guard-event-choice-data'
import fashionPolice from '@/fashion-police/fashion-police'
import guardEpisodeImportData from './guard-event-import-data'
import guardEpisodeRandomData from './guard-event-random-data'

export default function guardHistoryEpisode (props: {
  label: string
  value: unknown
}): Episode<ListMovie> {
  const guards = {
    createdAt: guardNumber,
    mergeChoiceId: guardNumber
  }
  const optional = {
    archive: guardEpisodeItemData,
    choice: guardEpisodeChoiceData,
    import: guardEpisodeImportData,
    random: guardEpisodeRandomData,
    remove: guardEpisodeItemData,
    reset: guardEpisodeItemData,
    unarchive: guardEpisodeItemData
  }
  const guarded = fashionPolice({
    required: guards,
    optional,
    label: props.label,
    value: props.value
  })
  return guarded
}
