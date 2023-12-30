import { Movie } from '@prisma/client'
import { MovieContextValue } from './movie-types'
import { contextCreator } from '../context-creator/context-creator'
import deleteMovie from './delete-movie'
import { useList } from '../list/list-context'

function useValue (props: {
  row: Movie
}): MovieContextValue {
  const list = useList()
  async function _delete (): Promise<void> {
    await deleteMovie({ listId: list.row.id, movieId: props.row.id })
    list.deleteMovie({ movieId: props.row.id })
  }
  const value: MovieContextValue = {
    delete: _delete,
    row: props.row
  }
  return value
}

export const {
  useCreatedContext: useMovie,
  CreatedProvider: MovieProvider
} = contextCreator({ name: 'movie', useValue })
