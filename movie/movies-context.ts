import contextCreator from 'context-creator'
import { CalculatedMovie } from './movie-types'
import useFlagbearer from '@/flagbearer/use-flagbearer'
import siftMovie from './sift-movie'
import useSifter from '@/sifter/use-sifter'

const moviesContext = contextCreator({
  name: 'movies',
  useValue: (props: {
    movies: CalculatedMovie[]
  }) => {
    const flag = useFlagbearer({ initial: true })
    const sifter = useSifter({
      rows: props.movies,
      sift: siftMovie
    })
    const value = {
      flag,
      movies: props.movies,
      sifter
    }
    return value
  }
})
export default moviesContext
