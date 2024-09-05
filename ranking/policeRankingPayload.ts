import fashionPolice from '@/fashion-police/fashion-police'
import { RankingPayload } from './rankingTypes'
import policeRankedMovieArray from '@/movie/police-ranked-movie-array'

export default function policeRankingPayload (props: {
  label: string
  value: unknown
}): RankingPayload {
  const required = {
    ranking: policeRankedMovieArray
  }
  const policed = fashionPolice({
    label: props.label,
    required,
    value: props.value
  })
  return policed
}
