import { CalculatedMovie } from './movie-types'
import { useList } from '../list/list-context'
import contextCreator from 'context-creator'

export const {
  useContext: useMovie,
  Provider: MovieProvider
} = contextCreator({
  name: 'movie',
  useValue: (props: {
    calculated: CalculatedMovie
  }) => {
    const list = useList()
    function archive (): void {
      list.archive({ movieId: props.calculated.id })
    }
    function remove (): void {
      list.removeMovie({ movieId: props.calculated.id })
    }
    function reset (): void {
      list.reset({ movieId: props.calculated.id })
    }
    function unarchive (): void {
      list.unarchive({ movieId: props.calculated.id })
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
