import fashionPolice from '@/fashion-police/fashion-police'
import { ListingPayload } from './listing-types'
import policeRankedMovieArray from '@/movie/police-ranked-movie-array'

export default function policeListingPayload (props: {
  label: string
  value: unknown
}): ListingPayload {
  const required = {
    listing: policeRankedMovieArray
  }
  const policed = fashionPolice({
    label: props.label,
    required,
    value: props.value
  })
  return policed
}
