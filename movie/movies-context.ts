import contextCreator from 'context-creator'
import { RankedMovie } from './movie-types'
import useFlagbearer from '@/flagbearer/use-flagbearer'
import siftMovie from './sift-movie'
import useSifter from '@/sifter/use-sifter'

const moviesContext = contextCreator({
  name: 'movies',
  useValue: (props: {
    movies: RankedMovie[]
  }) => {
    const flag = useFlagbearer({ initial: true })
    const seedless = props.movies.every((movie) => {
      const nullish = movie.seed == null
      const zeroed = movie.seed === 0
      const seedless = nullish || zeroed
      return seedless
    })
    const sifter = useSifter({
      rows: props.movies,
      sift: siftMovie
    })
    const value = {
      flag,
      movies: props.movies,
      seedless,
      sifter
    }
    return value
  }
})
export default moviesContext
