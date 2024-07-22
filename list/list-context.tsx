import postArchive from '@/archive/post-archive'
import postChoice from '@/choice/post-choice'
import archiveItem from '@/mergechoice/archiveItem'
import getCalculatedItem from '@/mergechoice/getCalculatedItem'
import getDefaultOptionIndex from '@/mergechoice/getDefaultOptionIndex'
import importItems from '@/mergechoice/importItems'
import rewindState from '@/mergechoice/rewindState'
import postRemoveMovie from '@/movie/post-remove-movie'
import postRewind from '@/rewind/post-rewind'
import shuffleSlice from '@/shuffleSlice/shuffleSlice'
import { AlwaysNever } from '@/shuffleSlice/shuffleSliceTypes'
import useQueue from '@/useQueue/useQueue'
import contextCreator from 'context-creator'
import { useCallback, useEffect, useState } from 'react'
import useFilter from '../filter/use-filter'
import chooseOption from '../mergechoice/chooseOption'
import createState from '../mergechoice/createState'
import { State } from '../mergechoice/mergeChoiceTypes'
import removeItem from '../mergechoice/removeItem'
import siftMovie from '../movie/sift-movie'
import { ChooseMovieRequest, CreateMoviesRequest, ListMovie, MovieData } from '../movie/movie-types'
import postMovies from '../movie/post-movies'
import getSortedMovies from '../movies/getSortedMovies'
import { RelatedList } from './list-types'
import { useOptionalLists } from './lists-context'
import unarchiveItem from '@/mergechoice/unarchiveItem'
import postUnarchive from '@/unarchive/post-unarchive'
import postReset from '@/reset/post-reset'
import resetItem from '@/mergechoice/resetItem'
import setupRandomChoice from '@/mergechoice/setupRandomChoice'
import postRandom from '@/random/post-random'
import siftEpisode from '@/episode/sift-episode'
import { useAuth } from '@/auth/auth-context'
import useFlagbearer from '@/flagbearer/use-flagbearer'

const listContext = contextCreator({
  name: 'list',
  useValue: (props: {
    row: RelatedList
    state?: State<ListMovie>
  }) => {
    const auth = useAuth()
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
    const archiveFlag = useFlagbearer()
    const historyFlag = useFlagbearer({
      onLower: () => {
        setOpenedEpisodes([])
      },
      onRaise: () => {
        const first = state.history[0]
        if (first != null) {
          openEpisode({ episodeId: first.mergeChoiceId })
        }
      }
    })
    const importingFlag = useFlagbearer()
    const moviesFlag = useFlagbearer({ initial: true })
    const [openedEpisodes, setOpenedEpisodes] = useState<number[]>([])
    useEffect(() => {
      const state = getDefaultState()
      setState(state)
    }, [getDefaultState])
    const moviesFilter = useFilter({
      rows: movies,
      filter: siftMovie
    })
    const values = Object.values(state.archive)
    const rows = values.map(value => {
      const row = { ...value, points: 0 }
      return row
    })
    const archiveFilter = useFilter({
      rows,
      filter: siftMovie
    })
    const episodesFilter = useFilter({
      rows: state.history,
      filter: siftEpisode
    })
    const authed = auth.session?.user.id === props.row.userId
    function openEpisode (props: { episodeId: number }): void {
      setOpenedEpisodes([...openedEpisodes, props.episodeId])
    }
    function closeEpisode (props: { episodeId: number }): void {
      const filtered = openedEpisodes.filter(id => id !== props.episodeId)
      setOpenedEpisodes(filtered)
    }
    function toggleEpisode (props: { episodeId: number }): void {
      const opened = openedEpisodes.includes(props.episodeId)
      if (opened) {
        closeEpisode(props)
      } else {
        openEpisode(props)
      }
    }
    const archiveCopy = [...archiveFilter.filtered]
    const sortedArchive = archiveCopy.sort((a, b) => {
      return a.name.localeCompare(b.name)
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
    function archive (archiveProps: {
      movieId: number
    }): void {
      const item = getCalculatedItem({ itemId: archiveProps.movieId, state })
      const label = `Archive ${item.name}`
      function local (updateProps: { state: State<ListMovie> }): State<ListMovie> {
        const newState = archiveItem({
          itemId: archiveProps.movieId,
          state: updateProps.state
        })
        return newState
      }
      const body = {
        lastMergechoiceId: state.history[0].mergeChoiceId,
        listId: props.row.id,
        archive: {
          item
        }
      }
      async function remote (): Promise<void> {
        await postArchive({ body, label: 'archive' })
      }
      queueState({ label, local, remote })
    }
    function choose (chooseProps: {
      betterIndex: number
    }): void {
      if (state.choice == null) {
        throw new Error('There is no choice')
      }
      function local (props: { state: State<ListMovie> }): State<ListMovie> {
        const newState = chooseOption({
          betterIndex: chooseProps.betterIndex,
          state: props.state
        })
        if (historyFlag.flag) {
          openEpisode({ episodeId: newState.history[0].mergeChoiceId })
        } else {
          setOpenedEpisodes([newState.history[0].mergeChoiceId])
        }
        return newState
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
        await postChoice({ body, label: 'choose' })
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
    } & AlwaysNever): Promise<void> {
      const sliced = shuffleSlice({
        items: createMoviesProps.movies,
        slice: createMoviesProps.slice
      })
      const body: CreateMoviesRequest = {
        lastMergechoiceId: state.history[0]?.mergeChoiceId ?? null,
        listId: props.row.id,
        movies: sliced
      }
      const lastEpisode = state.history[0]
      if (lastEpisode != null) {
        body.lastMergechoiceId = lastEpisode.mergeChoiceId
      }
      const response = await postMovies({ body, label: 'importMovies' })
      if (response.import == null) {
        throw new Error('There is no import')
      }
      const label = `Import ${response.import.items.length} movies`
      function local (updateProps: { state: State<ListMovie> }): State<ListMovie> {
        if (response.import == null) {
          throw new Error('There is no import')
        }
        const newState = importItems({
          items: response.import.items,
          state: updateProps.state
        })
        return newState
      }
      queueState({ label, local })
    }
    function random (): void {
      const lastEpisode = state.history[0]
      if (lastEpisode == null) {
        throw new Error('There is no lastEpisode')
      }
      updateState({
        update: (updateProps) => {
          const newState = setupRandomChoice({ state: updateProps.state })
          const newEpisode = newState.history[0]
          async function perform (): Promise<void> {
            if (newEpisode.random == null) {
              throw new Error('There is no random')
            }
            const body = {
              lastMergechoiceId: lastEpisode.mergeChoiceId,
              listId: props.row.id,
              random: newEpisode.random
            }
            await postRandom({ body, label: 'random' })
          }
          const label = 'Create random choice'
          const task = { perform, label }
          void queue.add({ task })
          return newState
        }
      })
    }
    function removeMovie (deleteMovieProps: {
      movieId: number
    }): void {
      const item = getCalculatedItem({ itemId: deleteMovieProps.movieId, state })
      const label = `Remove ${item.name}`
      function local (updateProps: { state: State<ListMovie> }): State<ListMovie> {
        const newState = removeItem({
          itemId: deleteMovieProps.movieId,
          state: updateProps.state
        })
        return newState
      }
      const body = {
        lastMergechoiceId: state.history[0].mergeChoiceId,
        listId: props.row.id,
        remove: {
          item
        }
      }
      async function remote (): Promise<void> {
        await postRemoveMovie({ body, label: 'removeMovie' })
      }
      queueState({ label, local, remote })
    }
    function reset (resetProps: {
      movieId: number
    }): void {
      const item = getCalculatedItem({
        itemId: resetProps.movieId, state
      })
      const label = `Reset ${item.name}`
      function local (updateProps: { state: State<ListMovie> }): State<ListMovie> {
        const newState = resetItem({
          itemId: resetProps.movieId,
          state: updateProps.state
        })
        return newState
      }
      const body = {
        lastMergechoiceId: state.history[0].mergeChoiceId,
        listId: props.row.id,
        reset: {
          item
        }
      }
      async function remote (): Promise<void> {
        await postReset({ body, label: 'reset' })
      }
      queueState({ label, local, remote })
    }
    function rewind (rewindProps: {
      episodeMergechoiceId: number
    }): void {
      const lastEpisode = state.history[0]
      if (lastEpisode == null) {
        throw new Error('There is no lastEpisode')
      }
      function local (updateProps: { state: State<ListMovie> }): State<ListMovie> {
        const newState = rewindState({
          episodeId: rewindProps.episodeMergechoiceId,
          state: updateProps.state
        })
        return newState
      }
      const localeString = new Date().toLocaleString()
      const label = `Rewind before ${localeString}`
      async function remote (): Promise<void> {
        await postRewind({
          episodeMergechoiceId: rewindProps.episodeMergechoiceId,
          label,
          lastMergechoiceId: lastEpisode.mergeChoiceId,
          listId: props.row.id
        })
      }
      queueState({ label, local, remote })
    }
    function unarchive (archiveProps: {
      movieId: number
    }): void {
      const item = state.archive[archiveProps.movieId]
      if (item == null) {
        throw new Error('There is no item')
      }
      const label = `Unarchive ${item.name}`
      function local (updateProps: { state: State<ListMovie> }): State<ListMovie> {
        const newState = unarchiveItem({
          itemId: archiveProps.movieId,
          state: updateProps.state
        })
        return newState
      }
      const body = {
        lastMergechoiceId: state.history[0].mergeChoiceId,
        listId: props.row.id,
        unarchive: {
          item: {
            ...item,
            points: 0
          }
        }
      }
      async function remote (): Promise<void> {
        await postUnarchive({ body, label: 'archive' })
      }
      queueState({ label, local, remote })
    }
    const synced = queue.taskQueue.currentTask == null
    function sift (props: {
      query: string | undefined
    }): void {
      moviesFilter.sift({ query: props.query })
      archiveFilter.sift({ query: props.query })
      episodesFilter.sift({ query: props.query })
    }
    const value = {
      archive,
      archiveFlag,
      authed,
      choose,
      importMovies,
      defaultOptionIndex,
      defer,
      delete: _delete,
      historyFlag,
      importingFlag,
      removeMovie,
      sift,
      siftArchive: archiveFilter.sift,
      siftedArchive: sortedArchive,
      siftedEpisodes: episodesFilter.filtered,
      siftMovies: moviesFilter.sift,
      siftedMovies: moviesFilter.filtered,
      movies,
      moviesFlag,
      openedEpisodes,
      queue,
      random,
      reset,
      rewind,
      row: props.row,
      state,
      synced,
      toggleEpisode,
      unarchive
    }
    return value
  }
})
export const {
  useContext: useList,
  Provider: ListProvider
} = listContext
export default listContext
