import { CalculatedMovie } from './movie-types'
import deleteMovie from './delete-movie'
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
    async function _delete (): Promise<void> {
      await deleteMovie({ listId: list.row.id, movieId: props.calculated.id })
      list.deleteMovie({ movieId: props.calculated.id })
    }
    const imdbUrl = `https://www.imdb.com/title/${props.calculated.imdbId}`
    function open (): void {
      window.open(imdbUrl, '_blank')
    }
    const value = {
      calculated: props.calculated,
      delete: _delete,
      imdbUrl,
      open
    }
    return value
  }
})
