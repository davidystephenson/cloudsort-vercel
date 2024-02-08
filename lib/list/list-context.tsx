import { ListContextValue, RelatedList } from './list-types'
import { Movie } from '@prisma/client'
import { contextCreator } from '../context-creator/context-creator'
import { useListsUnsafe } from './lists-context'
import { MovieData, PostMovieBody, PostMoviesBody } from '../movie/movie-types'
import postMovie from '../movie/post-movie'
import deleteList from './delete-list'
import { useCallback, useEffect, useState } from 'react'
import useFilter from '../filter/use-filter'
import filterMovie from '../movie/filterMovie'
import { State } from '../mergeChoice/merge-choice-types'
import createYeastState from '../mergeChoice/createYeastState'
import getSortedMovies from '../movies/getSortedMovies'
import importItems from '../mergeChoice/importItems'
import removeItem from '../mergeChoice/removeItem'
import chooseMovie from '../movie/choose-movie'
import chooseOption from '../mergeChoice/chooseOption'
import postMovies from '../movie/post-movies'
import shuffleSlice from '../mergeChoice/shuffleSlice'

function useValue (props: {
  row: RelatedList
  state?: State<Movie>
}): ListContextValue {
  console.log('row:', props.row)
  console.log('state:', props.state)
  const lists = useListsUnsafe()
  const getDefaultState = useCallback(() => {
    return props.state ?? createYeastState<Movie>()
  }, [props.state])
  const [state, setState] = useState(getDefaultState)
  const [movies, setMovies] = useState(() => {
    const sortedMovies = getSortedMovies({ state })
    return sortedMovies
  })
  useEffect(() => {
    const state = getDefaultState()
    setState(state)
  }, [props.state])
  const { filter, filtered } = useFilter({
    rows: movies,
    filter: filterMovie
  })
  async function updateState (callback: (current: State<Movie>) => Promise<State<Movie>>): Promise<void> {
    const newState = await callback(state)
    const sortedMovies = getSortedMovies({ state: newState })
    setMovies(sortedMovies)
    setState(newState)
  }
  async function importMovies (props: {
    movies: Movie[]
    slice?: number
  }): Promise<void> {
    void updateState(async current => {
      const newState = await importItems({
        items: props.movies,
        slice: props.slice,
        state: current
      })
      return newState
    })
  }
  async function createMovie (
    createMovieProps: MovieData
  ): Promise<Movie> {
    const body: PostMovieBody = {
      listId: props.row.id,
      ...createMovieProps
    }
    const movie = await postMovie({ body })
    await importMovies({ movies: [movie] })
    return movie
  }
  async function createMovies (createMoviesProps: {
    movies: MovieData[]
    slice?: number
  }): Promise<Movie[]> {
    const sliced = shuffleSlice({
      slice: createMoviesProps.slice,
      items: createMoviesProps.movies
    })
    const body: PostMoviesBody = {
      listId: props.row.id,
      movies: sliced
    }
    const newMovies = await postMovies({ body })
    await importMovies({ movies: newMovies })
    return newMovies
  }
  async function _delete (): Promise<void> {
    await deleteList({ id: props.row.id })
    lists?.delete({ id: props.row.id })
  }
  function deleteMovie (props: {
    movieId: number
  }): void {
    void updateState(async current => {
      const newState = await removeItem({ id: props.movieId, state: current })
      return newState
    })
  }
  async function choose (chooseProps: {
    betterIndex: number
  }): Promise<void> {
    await updateState(async current => {
      const body = {
        betterIndex: chooseProps.betterIndex,
        listId: props.row.id
      }
      await chooseMovie({ body })
      const newState = await chooseOption({
        betterIndex: chooseProps.betterIndex, state: current
      })
      return newState
    })
  }
  const value: ListContextValue = {
    choose,
    createMovie,
    createMovies,
    delete: _delete,
    deleteMovie,
    filter,
    filtered,
    movies,
    row: props.row,
    state
  }
  return value
}

export const {
  useCreatedContext: useList,
  CreatedProvider: ListProvider
} = contextCreator({ name: 'list', useValue })
