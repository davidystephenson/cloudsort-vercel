import fashionPolice from '@/fashion-police/fashion-police'
import { HistoryImportData } from '@/mergeChoice/mergeChoiceTypes'
import guardCalculatedMovieArray from '@/movie/guard-calculated-movie-array'
import { ListMovie } from '@/movie/movie-types'

export default function guardEventImportData (props: {
  label: string
  value: unknown
}): HistoryImportData<ListMovie> {
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
