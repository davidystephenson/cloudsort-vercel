import postArchive from '@/archive/post-archive'
import postChoice from '@/choice/post-choice'
import siftEpisode from '@/episode/sift-episode'
import useFlagbearer from '@/flagbearer/use-flagbearer'
import archiveItem from '@/mergechoice/archiveItem'
import getCalculatedItem from '@/mergechoice/getCalculatedItem'
import getDefaultOptionIndex from '@/mergechoice/getDefaultOptionIndex'
import importItems from '@/mergechoice/importItems'
import resetItem from '@/mergechoice/resetItem'
import setupRandomChoice from '@/mergechoice/setupRandomChoice'
import unarchiveItem from '@/mergechoice/unarchiveItem'
import postRemoveMovie from '@/movie/post-remove-movie'
import postRandom from '@/random/post-random'
import postReset from '@/reset/post-reset'
import postRewind from '@/rewind/post-rewind'
import shuffleSlice from '@/shuffleSlice/shuffleSlice'
import { AlwaysNever } from '@/shuffleSlice/shuffleSliceTypes'
import postUnarchive from '@/unarchive/post-unarchive'
import useQueue from '@/useQueue/useQueue'
import contextCreator from 'context-creator'
import { useEffect, useRef, useState } from 'react'
import chooseOption from '../mergechoice/chooseOption'
import { State } from '../mergechoice/mergeChoiceTypes'
import removeItem from '../mergechoice/removeItem'
import { ChooseMovieRequest, CreateMoviesRequest, ListMovie, MovieData } from '../movie/movie-types'
import postMovies from '../movie/post-movies'
import siftMovie from '../movie/sift-movie'
import getSortedMovies from '../movies/getSortedMovies'
import { useOptionalLists } from './lists-context'
import { useListContext } from './list-context'
import useAction from '@/action/use-action'
import { useRouter } from 'next/navigation'
import useSifter from '@/sifter/use-sifter'
import getChoiceCountRange from '@/mergechoice/getChoiceCountRange'
import getRankedMovies from '@/rank/get-ranked-movies'

const privateListContext = contextCreator({
  name: 'privateList',
  useValue: (props: {
    state: State<ListMovie>
  }) => {
    const list = useListContext()
    const lists = useOptionalLists()
    const queue = useQueue()
    const router = useRouter()
    const rewindWorkerRef = useRef<Worker>()
    useEffect(() => {
      rewindWorkerRef.current = new Worker(new URL('../rewind/rewind-worker.ts', import.meta.url))
      rewindWorkerRef.current.onmessage = (event: MessageEvent<State<ListMovie>>) => {
        console.log('received onMessage event:', event)
      }
      return () => {
        rewindWorkerRef.current?.terminate()
      }
    }, [])
    const [state, setState] = useState(props.state)
    useEffect(() => {
      setState(props.state)
    }, [props.state])
    const [sortedMovies, setSortedMovies] = useState(() => {
      const sortedMovies = getSortedMovies({ state })
      return sortedMovies
    })
    const rankedMovies = getRankedMovies({ sortedMovies })
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
    const importAction = useAction()
    const [openedEpisodes, setOpenedEpisodes] = useState<number[]>([])
    const randoming = state.choice?.random === true
    const archivedMovies = Object.values(state.archive)
    const copiedArchivedMovies = [...archivedMovies]
    const sortedArchivedMovies = copiedArchivedMovies.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    const calculatedArchivedMovies = sortedArchivedMovies.map(value => {
      const row = { ...value, points: 0 }
      return row
    })
    const range = getChoiceCountRange({ state })
    const archiveSifter = useSifter({
      rows: calculatedArchivedMovies,
      sift: siftMovie
    })
    const historySifter = useSifter({
      rows: state.history,
      sift: siftEpisode
    })
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
    const defaultOptionIndex = getDefaultOptionIndex({
      movies: state.items,
      choice: state.choice
    })
    async function _delete (): Promise<void> {
      await lists?.delete({ id: list.id })
      router.push('/lists')
    }
    function updateState (props: {
      newState: State<ListMovie>
    }): void {
      const sortedMovies = getSortedMovies({ state: props.newState })
      setSortedMovies(sortedMovies)
      setState(props.newState)
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
      const newState = props.local({ state })
      updateState({ newState })
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
        listId: list.id,
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
        listId: list.id
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
        listId: list.id,
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
      const newState = setupRandomChoice({ state })
      const newEpisode = newState.history[0]
      async function perform (): Promise<void> {
        if (newEpisode.random == null) {
          throw new Error('There is no random')
        }
        const body = {
          lastMergechoiceId: lastEpisode.mergeChoiceId,
          listId: list.id,
          random: newEpisode.random
        }
        await postRandom({ body, label: 'random' })
      }
      const label = 'Create random choice'
      const task = { perform, label }
      void queue.add({ task })
      updateState({ newState })
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
        listId: list.id,
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
        listId: list.id,
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
        console.log('rewind local:', rewindWorkerRef)
        rewindWorkerRef.current?.postMessage({
          episodeId: rewindProps.episodeMergechoiceId,
          state: updateProps.state
        })
        // const newState = rewindState({
        //   episodeId: rewindProps.episodeMergechoiceId,
        //   state: updateProps.state
        // })
        // return newState
        return updateProps.state
      }
      const localeString = new Date().toLocaleString()
      const label = `Rewind before ${localeString}`
      async function remote (): Promise<void> {
        await postRewind({
          episodeMergechoiceId: rewindProps.episodeMergechoiceId,
          label,
          lastMergechoiceId: lastEpisode.mergeChoiceId,
          listId: list.id
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
        listId: list.id,
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
    const value = {
      archive,
      archiveFlag,
      archiveSifter,
      choose,
      importMovies,
      defaultOptionIndex,
      defer,
      delete: _delete,
      historyFlag,
      historySifter,
      importAction,
      removeMovie,
      movies: rankedMovies,
      openedEpisodes,
      queue,
      random,
      randoming,
      range,
      reset,
      rewind,
      state,
      synced,
      toggleEpisode,
      unarchive
    }
    return value
  }
})
export default privateListContext
