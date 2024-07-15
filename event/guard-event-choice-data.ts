import guardBoolean from '@/fashion-police/guard-boolean'
import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import guardStringNumber from '@/fashion-police/guard-string-number'
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
  const guarded = fashionPolice({
    required: guards,
    label: props.label,
    value: props.value
  })
  return guarded
}
