import contextCreator from 'context-creator'
import { RankedMovie } from './movie-types'
import useFlagbearer from '@/flagbearer/use-flagbearer'
import { Sifter } from '@/sifter/sifter-types'

const moviesContext = contextCreator({
  name: 'movies',
  useValue: (props: {
    movies: RankedMovie[]
    sifter: Sifter<RankedMovie>
  }) => {
    const flag = useFlagbearer({ initial: true })
    const seedless = props.movies.every((movie) => {
      const nullish = movie.seed == null
      const zeroed = movie.seed === 0
      const seedless = nullish || zeroed
      return seedless
    })
    const value = {
      flag,
      movies: props.movies,
      seedless,
      sifter: props.sifter
    }
    return value
  }
})
export default moviesContext
