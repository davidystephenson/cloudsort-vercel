import { CalculatedMovie, RankedMovie } from '@/movie/movie-types'

export default function getRankedMovies (props: {
  sortedMovies: CalculatedMovie[]
}): RankedMovie[] {
  const pointValues: number[] = []
  props.sortedMovies.forEach(movie => {
    const included = pointValues.includes(movie.points)
    if (included) {
      return
    }
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
