import { CalculatedMovie } from '@/movie/movie-types'
import getRankedMovies from '@/rank/get-ranked-movies'
import { Ranking } from './rankingTypes'

export default function moviesToRanking (props: {
  sortedMovies: CalculatedMovie[]
}): Ranking {
  const ranked = getRankedMovies({ sortedMovies: props.sortedMovies })
  const cleaned = ranked.map((movie) => {
    const cleaned = { ...movie, seed: 0, points: 0 }
    return cleaned
  })
  return cleaned
}
