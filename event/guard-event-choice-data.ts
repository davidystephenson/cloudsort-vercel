import guardBoolean from '@/guard/guard-boolean'
import guardModel from '@/guard/guard-model'
import guardNumber from '@/guard/guard-number'
import guardStringNumber from '@/guard/guard-string-number'
import { HistoryChoiceData } from '@/mergeChoice/mergeChoiceTypes'
import guardCalculatedMovie from '@/movie/guard-calculated-movie'
import { ListMovie } from '@/movie/movie-types'

export default function guardEventChoiceData (props: {
  label: string
  value: unknown
}): HistoryChoiceData<ListMovie> {
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
  const guarded = guardModel({
    guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
