import { RelatedList } from './list-types'
import { Movie } from '@prisma/client'
import { useOptionalLists } from './lists-context'
import { MovieData, PostMovieBody, PostMoviesBody } from '../movie/movie-types'
import postMovie from '../movie/post-movie'
import deleteList from './delete-list'
import { useCallback, useEffect, useState } from 'react'
import useFilter from '../filter/use-filter'
import filterMovie from '../movie/filterMovie'
import { State } from '../mergeChoice/merge-choice-types'
import getSortedMovies from '../movies/getSortedMovies'
import importItems from '../mergeChoice/importItems'
import removeItem from '../mergeChoice/removeItem'
import postChooseMovie from '../movie/post-choose-movie'
import chooseOption from '../mergeChoice/chooseOption'
import postMovies from '../movie/post-movies'
import contextCreator from 'context-creator'
import createState from '../mergeChoice/createState'
import shuffleSlice from '@/shuffleSlice/shuffleSlice'

export const {
  useContext: useList,
  Provider: ListProvider
} = contextCreator({
  name: 'list',
  useValue: (props: {
    row: RelatedList
    state?: State<Movie>
  }) => {
    const lists = useOptionalLists()
    const getDefaultState = useCallback(() => {
      return props.state ?? createState<Movie>()
    }, [props.state])
    const [state, setState] = useState(getDefaultState)
    const [movies, setMovies] = useState(() => {
      const sortedMovies = getSortedMovies({ state })
      return sortedMovies
    })
    useEffect(() => {
      const state = getDefaultState()
      setState(state)
    }, [getDefaultState])

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
    function importMovies (props: {
      movies: Movie[]
      slice?: number
    }): void {
      void updateState(async current => {
        const newState = importItems({
          items: props.movies,
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
      importMovies({ movies: [movie] })
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
      importMovies({ movies: newMovies })
      return newMovies
    }
    async function _delete (): Promise<void> {
      const body = { listId: props.row.id }
      await deleteList({ body })
      await lists?.delete({ id: props.row.id })
    }
    function deleteMovie (props: {
      movieId: number
    }): void {
      void updateState(async current => {
        const newState = removeItem({ id: props.movieId, state: current })
        return newState
      })
    }
    async function choose (chooseProps: {
      betterIndex: number
      movieId: number
    }): Promise<void> {
      await updateState(async current => {
        const newState = chooseOption({
          betterIndex: chooseProps.betterIndex, state: current
        })
        async function request (): Promise<void> {
          const body = {
            betterIndex: chooseProps.betterIndex,
            listId: props.row.id
          }
          await postChooseMovie({ body })
        }
        await request()

        return newState
      })
    }
    const value = {
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
})
