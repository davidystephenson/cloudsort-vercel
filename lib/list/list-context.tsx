import { ListContextValue } from './list-types'
import { List, Movie } from '@prisma/client'
import { contextCreator } from '../context-creator/context-creator'
import { useListsUnsafe } from './lists-context'
import { MovieData, PostMovieBody } from '../movie/movie-types'
import postMovie from '../movie/post-movie'
import deleteList from './delete-list'
import { useEffect, useState } from 'react'

function useValue (props: {
  row: List
  movies: Movie[]
}): ListContextValue {
  const lists = useListsUnsafe()
  const [movies, setMovies] = useState(props.movies)
  useEffect(() => {
    setMovies(props.movies)
  }, [props.movies])
  async function createMovie (
    createMovieProps: MovieData
  ): Promise<Movie> {
    const body: PostMovieBody = {
      listId: props.row.id,
      ...createMovieProps
    }
    const movie = await postMovie(body)
    setMovies([movie, ...movies])
    lists?.createMovie({
      movie,
      listId: props.row.id
    })
    return movie
  }
  async function _delete (): Promise<void> {
    await deleteList({ id: props.row.id })
    lists?.delete({ id: props.row.id })
  }
  const value: ListContextValue = {
    createMovie,
    delete: _delete,
    movies,
    row: props.row
  }
  return value
}

export const {
  useCreatedContext: useList,
  CreatedProvider: ListProvider
} = contextCreator({ name: 'list', useValue })
