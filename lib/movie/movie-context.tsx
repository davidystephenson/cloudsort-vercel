import { CalculatedMovie, MovieContextValue } from './movie-types'
import { contextCreator } from '../context-creator/context-creator'
import deleteMovie from './delete-movie'
import { useList } from '../list/list-context'

function useValue (props: {
  calculated: CalculatedMovie
}): MovieContextValue {
  const list = useList()
  async function _delete (): Promise<void> {
    await deleteMovie({ listId: list.row.id, movieId: props.calculated.id })
    list.deleteMovie({ movieId: props.calculated.id })
  }
  const value: MovieContextValue = {
    delete: _delete,
    calculated: props.calculated
  }
  return value
}

export const {
  useCreatedContext: useMovie,
  CreatedProvider: MovieProvider
} = contextCreator({ name: 'movie', useValue })
