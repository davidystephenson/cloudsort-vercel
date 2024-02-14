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
    const value = {
      delete: _delete,
      calculated: props.calculated
    }
    return value
  }
})
