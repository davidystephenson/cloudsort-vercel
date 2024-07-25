import privateListContext from '@/list/private-list-context'
import { CalculatedMovie } from './movie-types'
import contextCreator from 'context-creator'

const movieContext = contextCreator({
  name: 'movie',
  useValue: (props: {
    calculated: CalculatedMovie
  }) => {
    const privateList = privateListContext.useContext()
    function archive (): void {
      privateList.archive({ movieId: props.calculated.id })
    }
    function remove (): void {
      privateList.removeMovie({ movieId: props.calculated.id })
    }
    function reset (): void {
      privateList.reset({ movieId: props.calculated.id })
    }
    function unarchive (): void {
      privateList.unarchive({ movieId: props.calculated.id })
    }
    const imdbUrl = `https://www.imdb.com/title/${props.calculated.imdbId}`
    function open (): void {
      window.open(imdbUrl, '_blank')
    }
    const value = {
      archive,
      calculated: props.calculated,
      remove,
      reset,
      imdbUrl,
      open,
      unarchive
    }
    return value
  }
})
export default movieContext
export const {
  useContext: useMovie,
  Provider: MovieProvider
} = movieContext
