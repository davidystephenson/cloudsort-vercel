import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import guardCalculatedMovie from './guard-calculated-movie'
import { RankedMovie } from './movie-types'

export default function policeRankedMovie (props: {
  label: string
  value: unknown
}): RankedMovie {
  const calculatedMovie = guardCalculatedMovie({
    label: props.label,
    value: props.value
  })
  const rank = fashionPolice({
    required: {
      rank: guardNumber
    },
    label: props.label,
    value: props.value
  })
  const policed = { ...calculatedMovie, ...rank }
  return policed
}
