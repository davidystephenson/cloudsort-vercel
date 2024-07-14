import guardNumber from '@/guard/guard-number'
import { HistoryEvent } from '@/mergeChoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import guardEventItemData from './guard-event-item-data'
import guardEventChoiceData from './guard-event-choice-data'
import guardModel from '@/guard/guard-model'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import guardCalculatedMovieArray from '@/movie/guard-calculated-movie-array'

export default function guardHistoryEvent (props: {
  label: string
  value: unknown
}): HistoryEvent<ListMovie> {
  const guards = {
    archive: guardEventItemData,
    choice: guardEventChoiceData,
    createdAt: guardNumber,
    import: {
      items: guardCalculatedMovieArray
    },
    mergeChoiceId: guardNumber,
    random: {
      first: guardCalculatedMovie,
      second: guardCalculatedMovie
    },
    remove: guardEventItemData,
    reset: guardEventItemData,
    unarchive: guardEventItemData
  }
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
