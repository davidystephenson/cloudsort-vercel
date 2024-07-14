import shiftEvent from '@/event/shift-event'
import getCalculatedItem from '@/mergeChoice/getCalculatedItem'
import getDefaultOptionIndex from '@/mergeChoice/getDefaultOptionIndex'
import postRemoveMovie from '@/movie/post-remove-movie'
import shuffleSlice from '@/shuffleSlice/shuffleSlice'
import useQueue from '@/useQueue/useQueue'
import contextCreator from 'context-creator'
import { useCallback, useEffect, useState } from 'react'
import useFilter from '../filter/use-filter'
import chooseOption from '../mergeChoice/chooseOption'
import createState from '../mergeChoice/createState'
import { State } from '../mergeChoice/mergeChoiceTypes'
import removeItem from '../mergeChoice/removeItem'
import filterMovie from '../movie/filterMovie'
import { ChooseMovieRequest, CreateMoviesRequest, ListMovie, MovieData } from '../movie/movie-types'
import postChooseMovie from '../movie/post-choose-movie'
import postMovies from '../movie/post-movies'
import getSortedMovies from '../movies/getSortedMovies'
import { RelatedList } from './list-types'
import { useOptionalLists } from './lists-context'

export const {
  useContext: useList,
  Provider: ListProvider
} = contextCreator({
  name: 'list',
  useValue: (props: {
    row: RelatedList
    state?: State<ListMovie>
  }) => {
    const lists = useOptionalLists()
    const queue = useQueue()
    const getDefaultState = useCallback(() => {
      return props.state ?? createState<ListMovie>({ seed: props.row.seed })
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
    const defaultOptionIndex = getDefaultOptionIndex({
      movies: state.items,
      choice: state.choice
    })
    async function _delete (): Promise<void> {
      await lists?.delete({ id: props.row.id })
    }
    function updateState (props: {
      update: (props: { state: State<ListMovie> }) => State<ListMovie>
    }): void {
      const newState = props.update({ state })
      const sortedMovies = getSortedMovies({ state: newState })
      setMovies(sortedMovies)
      setState(newState)
    }
    function queueState (props: {
      remote?: () => Promise<unknown>
      label: string
      local: (props: { state: State<ListMovie> }) => State<ListMovie>
    }): void {
      const task = {
        perform: props.remote,
        label: props.label
      }
      void queue.add({ task })
      updateState({ update: props.local })
    }
    function choose (chooseProps: {
      betterIndex: number
    }): void {
      if (state.choice == null) {
        throw new Error('There is no choice')
      }
      const betterId = state.choice?.options[chooseProps.betterIndex]
      const worseIndex = 1 - chooseProps.betterIndex
      const worseId = state.choice?.options[worseIndex]
      if (worseId == null) {
        throw new Error('There is no worseId')
      }
      const betterItem = state.items[betterId]
      const worseItem = state.items[worseId]
      const label = `${betterItem.name} > ${worseItem.name}`
      function local (props: { state: State<ListMovie> }): State<ListMovie> {
        const newState = chooseOption({
          betterIndex: chooseProps.betterIndex,
          state: props.state
        })
        return newState
      }
      const aId = state.choice.options[state.choice.aIndex]
      const bId = state.choice.options[state.choice.bIndex]
      const aBetter = aId === betterId
      const aItem = getCalculatedItem({ itemId: aId, state })
      const bItem = getCalculatedItem({ itemId: bId, state })
      const body: ChooseMovieRequest = {
        choice: {
          aBetter,
          aId,
          aItem,
          betterIndex: chooseProps.betterIndex,
          bId,
          bItem,
          random: state.choice.random,
          seeded: false
        },
        lastMergechoiceId: state.history[0].mergeChoiceId,
        listId: props.row.id
      }
      async function remote (): Promise<void> {
        await postChooseMovie({ body, label: 'choose' })
      }
      queueState({ label, local, remote })
    }
    function defer (): void {
      if (defaultOptionIndex == null) {
        throw new Error('There is no defaultOptionIndex')
      }
      choose({ betterIndex: defaultOptionIndex })
    }
    async function importMovies (createMoviesProps: {
      movies: MovieData[]
      slice?: number
    }): Promise<void> {
      const sliced = shuffleSlice({
        items: createMoviesProps.movies,
        slice: createMoviesProps.slice
      })
      const body: CreateMoviesRequest = {
        lastMergechoiceId: state.history[0].mergeChoiceId,
        listId: props.row.id,
        movies: sliced
      }
      const historyEvent = await postMovies({ body, label: 'importMovies' })
      if (historyEvent.import == null) {
        throw new Error('There is no import')
      }
      const label = `Import ${historyEvent.import.items.length} movies`
      function local (updateProps: { state: State<ListMovie> }): State<ListMovie> {
        const newState = shiftEvent({
          historyEvent,
          state: updateProps.state
        })
        return newState
      }
      queueState({ label, local })
    }
    function removeMovie (deleteMovieProps: {
      movieId: number
    }): void {
      const item = state.items[deleteMovieProps.movieId]
      const label = `Delete ${item.name}`
      function local (updateProps: { state: State<ListMovie> }): State<ListMovie> {
        const newState = removeItem({
          itemId: deleteMovieProps.movieId,
          state: updateProps.state
        })
        return newState
      }
      async function remote (): Promise<void> {
        const calculated = getCalculatedItem({ itemId: deleteMovieProps.movieId, state })
        const body = {
          lastMergechoiceId: state.history[0].mergeChoiceId,
          listId: props.row.id,
          remove: {
            item: calculated
          }
        }
        await postRemoveMovie({ body, label: 'removeMovie' })
      }
      queueState({ label, local, remote })
    }
    const value = {
      choose,
      importMovies,
      defaultOptionIndex,
      defer,
      delete: _delete,
      removeMovie,
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
