import fashionPolice from '@/fashion-police/fashion-police'
import guardNumber from '@/fashion-police/guard-number'
import { MovieWhere } from './movie-types'

export default function policeMovieWhere (props: {
  label: string
  value: unknown
}): MovieWhere {
  const required = {
    itemId: guardNumber
  }
  const policed = fashionPolice({
    label: props.label,
    required,
    value: props.value
  })
  return policed
}
