import { RelatedList } from './list-types'
import { Movie } from '@prisma/client'
import { useOptionalLists } from './lists-context'
import { MovieData, PostMovieBody, PostMoviesBody } from '../movie/movie-types'
import postMovie from '../movie/post-movie'
import { useCallback, useEffect, useState } from 'react'
import useFilter from '../filter/use-filter'
import filterMovie from '../movie/filterMovie'
import { State } from '../mergeChoice/mergeChoiceTypes'
import getSortedMovies from '../movies/getSortedMovies'
import importItems from '../mergeChoice/importItems'
import removeItem from '../mergeChoice/removeItem'
import postChooseMovie from '../movie/post-choose-movie'
import chooseOption from '../mergeChoice/chooseOption'
import postMovies from '../movie/post-movies'
import contextCreator from 'context-creator'
import createState from '../mergeChoice/createState'
import shuffleSlice from '@/shuffleSlice/shuffleSlice'
import useQueue from '@/useQueue/useQueue'
import { OkResponse } from '@/respond/respond-types'
import postDeleteMovie from '@/movie/post-delete-movie'
import postImportMovies from '@/movie/post-import-movies'

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
    const queue = useQueue()
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
    async function _delete (): Promise<void> {
      await lists?.delete({ id: props.row.id })
    }
    function updateState (props: {
      update: (props: { state: State<Movie> }) => State<Movie>
    }): void {
      const newState = props.update({ state })
      const sortedMovies = getSortedMovies({ state: newState })
      setMovies(sortedMovies)
      setState(newState)
    }
    function queueState (props: {
      remote: () => Promise<unknown>
      label: string
      local: (props: { state: State<Movie> }) => State<Movie>
    }): void {
      const task = {
        perform: props.remote,
        label: props.label
      }
      void queue.add({ task })
      updateState({ update: props.local })
    }
    function importMovies (props: {
      movies: Movie[]
      slice?: number
    }): void {
      function update (updateProps: { state: State<Movie> }): State<Movie> {
        const newState = importItems({
          items: props.movies,
          state: updateProps.state
        })
        return newState
      }
      updateState({ update })
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
    }): Promise<void> {
      const sliced = shuffleSlice({
        items: createMoviesProps.movies
      })
      const body: PostMoviesBody = {
        listId: props.row.id,
        movies: sliced
      }
      const movies = await postMovies({ body })
      const label = `Import ${movies.length} movies`
      function local (updateProps: { state: State<Movie> }): State<Movie> {
        const newState = importItems({
          items: movies,
          state: updateProps.state
        })
        return newState
      }
      async function remote (): Promise<OkResponse> {
        const body = {
          listId: props.row.id,
          movies
        }
        return await postImportMovies({ body })
      }
      queueState({ label, local, remote })
    }
    function deleteMovie (deleteMovieProps: {
      movieId: number
    }): void {
      const item = state.items[deleteMovieProps.movieId]
      const label = `Delete ${item.name}`
      function local (updateProps: { state: State<Movie> }): State<Movie> {
        const newState = removeItem({
          itemId: deleteMovieProps.movieId,
          state: updateProps.state
        })
        return newState
      }
      async function remote (): Promise<OkResponse> {
        const body = {
          listId: props.row.id,
          movieId: deleteMovieProps.movieId
        }
        return await postDeleteMovie({ body })
      }
      queueState({ label, local, remote })
    }
    function choose (chooseProps: {
      betterIndex: number
      movieId: number
    }): void {
      const betterId = state.choice?.options[chooseProps.betterIndex]
      if (betterId == null) {
        throw new Error('There is no betterId')
      }
      const worseIndex = 1 - chooseProps.betterIndex
      const worseId = state.choice?.options[worseIndex]
      if (worseId == null) {
        throw new Error('There is no worseId')
      }
      const betterItem = state.items[betterId]
      const worseItem = state.items[worseId]
      const label = `${betterItem.name} > ${worseItem.name}`
      function local (props: { state: State<Movie> }): State<Movie> {
        const newState = chooseOption({
          betterIndex: chooseProps.betterIndex,
          state: props.state
        })
        return newState
      }
      async function remote (): Promise<OkResponse> {
        const body = {
          betterIndex: chooseProps.betterIndex,
          listId: props.row.id
        }
        return await postChooseMovie({ body })
      }
      queueState({ label, local, remote })
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
      queue,
      row: props.row,
      state
    }
    return value
  }
})
