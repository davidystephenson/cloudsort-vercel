import { CalculatedMovie, RankedMovie } from '@/movie/movie-types'

export default function getRankedMovies (props: {
  sortedMovies: CalculatedMovie[]
}): RankedMovie[] {
  const pointValues: number[] = []
  props.sortedMovies.forEach(movie => {
    pointValues.push(movie.points)
  })
  const rankedMovies = props.sortedMovies.map((movie) => {
    const index = pointValues.indexOf(movie.points)
    const rank = index + 1
    const ranked = { ...movie, rank }
    return ranked
  })
  return rankedMovies
}
