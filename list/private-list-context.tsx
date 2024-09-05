import useAction from '@/action/use-action'
import postArchive from '@/archive/post-archive'
import postChoice from '@/choice/post-choice'
import siftEpisode from '@/episode/sift-episode'
import useFlagbearer from '@/flagbearer/use-flagbearer'
import archiveItem from '@/mergechoice/archiveItem'
import getCalculatedItem from '@/mergechoice/getCalculatedItem'
import getChoiceCountRange from '@/mergechoice/getChoiceCountRange'
import getDefaultOptionIndex from '@/mergechoice/getDefaultOptionIndex'
import importItems from '@/mergechoice/importItems'
import resetItem from '@/mergechoice/resetItem'
import setupRandomChoice from '@/mergechoice/setupRandomChoice'
import unarchiveItem from '@/mergechoice/unarchiveItem'
import createMovieChoiceRequest from '@/movie/create-movie-choice-request'
import postRemoveMovie from '@/movie/post-remove-movie'
import postRandom from '@/random/post-random'
import getRankedMovies from '@/rank/get-ranked-movies'
import postReset from '@/reset/post-reset'
import postRewind from '@/rewind/post-rewind'
import shuffleSlice from '@/shuffleSlice/shuffleSlice'
import { AlwaysNever } from '@/shuffleSlice/shuffleSliceTypes'
import useSifter from '@/sifter/use-sifter'
import postUnarchive from '@/unarchive/post-unarchive'
import useQueue from '@/useQueue/useQueue'
import contextCreator from 'context-creator'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import chooseOption from '../mergechoice/chooseOption'
import { State } from '../mergechoice/mergeChoiceTypes'
import removeItem from '../mergechoice/removeItem'
import { CreateMoviesRequest, ListMovie, MovieData } from '../movie/movie-types'
import postMovies from '../movie/post-movies'
import siftMovie from '../movie/sift-movie'
import getSortedMovies from '../movies/getSortedMovies'
import { useListContext } from './list-context'
import { useOptionalLists } from './lists-context'
import getRewindIndex from '@/mergechoice/getRewindIndex'
import { RewindHandlers, RewindMessage } from '@/shade/rewind-types'
import onRewind from '@/rewind/onRewind'
import { RestorePoint } from '@/restore/restoreTypes'
import downloadFile from '@/file/downloadFile'
import moviesToRanking from '@/ranking/moviesToRanking'
import downloadCritickerFile from '@/file/downloadCritickerFile'
import { ListHistory } from '@/history/history-types'
import debugChoice from '@/mergechoice/debugChoice'

const privateListContext = contextCreator({
  name: 'privateList',
  useValue: (props: {
    state: State<ListMovie>
  }) => {
    const list = useListContext()
    const lists = useOptionalLists()
    const queue = useQueue()
    const [restorePoints, setRestorePoints] = useState<RestorePoint[]>([])
    const savePoint = useCallback((savePointProps: {
      change: (props: { state: State<ListMovie> }) => State<ListMovie>
      state: State<ListMovie>
    }) => {
      const { history, ...listState } = savePointProps.state
      const cloneBefore = structuredClone(savePointProps.state)
      const newState = savePointProps.change({ state: cloneBefore })
      const newEpisode = newState.history[0]
      const restorePoint: RestorePoint = {
        episodeId: newEpisode.mergeChoiceId,
        listState
      }
      const [first, ...rest] = restorePoints
      const newRestorePoints = [...rest, restorePoint]
      if (first != null && newRestorePoints.length < 10) {
        newRestorePoints.unshift(first)
      }
      setRestorePoints(newRestorePoints)
      return newState
    }, [])
    const router = useRouter()
    const [state, setState] = useState(props.state)
    useEffect(() => {
      setState(props.state)
    }, [props.state])
    const [sortedMovies, setSortedMovies] = useState(() => {
      const sortedMovies = getSortedMovies({ state })
      return sortedMovies
    })
    const rankedMovies = getRankedMovies({ sortedMovies })
    const moviesSifter = useSifter({
      rows: rankedMovies,
      sift: siftMovie
    })
    const updateState = useCallback((props: {
      newState: State<ListMovie>
    }) => {
      const newState = structuredClone(props.newState)
      const sortedMovies = getSortedMovies({ state: newState })
      setSortedMovies(sortedMovies)
      setState(newState)
    }, [])
    const saveState = useCallback((saveStateProps: {
      change: (props: { state: State<ListMovie> }) => State<ListMovie>
    }) => {
      const newState = savePoint({ change: saveStateProps.change, state })
      updateState({ newState })
    }, [state])
    const rewindRestorePoints = useCallback((props: {
      history: ListHistory
    }) => {
      setRestorePoints(current => {
        const filtered = current.filter(point => {
          const included = props.history.some(episode => {
            const ided = episode.mergeChoiceId === point.episodeId
            return ided
          })
          return included
        })
        return filtered
      })
    }, [])
    const [rewindIndex, setRewindIndex] = useState(0)
    const [rewindLength, setRewindLength] = useState<number>()
    const rewindAction = useAction()
    const rewindWorkerRef = useRef<Worker>()
    const requestRewind = useCallback((requestRewindProps: {
      episodeId: number
      lastMergechoiceId: number
      state: State<ListMovie>
    }) => {
      const localeString = new Date().toLocaleString()
      const label = `Rewind before ${localeString}`
      const { history, ...snapshot } = requestRewindProps.state
      const json = JSON.stringify(snapshot)
      async function remote (): Promise<void> {
        const request = {
          episodeMergechoiceId: requestRewindProps.episodeId,
          lastMergechoiceId: requestRewindProps.lastMergechoiceId,
          listId: list.id,
          snapshot: json
        }
        await postRewind({
          label,
          request
        })
      }
      queueTask({ label, perform: remote })
    }, [updateState])
    const archivedMovies = Object.values(state.archive)
    const copiedArchivedMovies = [...archivedMovies]
    const sortedArchivedMovies = copiedArchivedMovies.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    const calculatedArchivedMovies = sortedArchivedMovies.map(value => {
      const row = { ...value, points: 0 }
      return row
    })
    const archiveSifter = useSifter({
      rows: calculatedArchivedMovies,
      sift: siftMovie
    })
    const historySifter = useSifter({
      rows: state.history,
      sift: siftEpisode
    })
    const sift = useCallback((props: {
      query: string | undefined
    }) => {
      moviesSifter.sift({ query: props.query })
      archiveSifter.sift({ query: props.query })
      historySifter.sift({ query: props.query })
    }, [archiveSifter.sift, historySifter.sift, moviesSifter.sift])
    const resetSifters = useCallback(() => {
      moviesSifter.reset()
      archiveSifter.reset()
      historySifter.reset()
    }, [archiveSifter.reset, historySifter.reset, moviesSifter.reset])
    useEffect(() => {
      rewindWorkerRef.current = new Worker(new URL('../rewind/rewind-worker.ts', import.meta.url))
      rewindWorkerRef.current.onmessage = (event: MessageEvent<RewindMessage>) => {
        const handlers: RewindHandlers = {
          episode: (props) => {
            setRewindIndex(props.message.index)
          },
          state: (stateProps) => {
            rewindAction.succeed()
            resetSifters()
            updateState({ newState: stateProps.message.state })
            requestRewind({
              episodeId: stateProps.message.episodeId,
              lastMergechoiceId: stateProps.message.lastMergechoiceId,
              state: stateProps.message.state
            })
          }
        }
        onRewind({
          key: event.data.type,
          message: event.data,
          receivers: handlers
        })
      }
      return () => {
        rewindWorkerRef.current?.terminate()
      }
    }, [requestRewind, rewindAction.succeed])
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
    const range = getChoiceCountRange({ state })
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
    function exportHistory (): void {
      const text = JSON.stringify(state.history)
      downloadFile({
        extension: 'json',
        label: 'history',
        listId: list.id,
        listName: list.name,
        text
      })
    }
    function exportCriticker (): void {
      const ranking = moviesToRanking({ sortedMovies })
      downloadCritickerFile({
        listId: list.id,
        listName: list.name,
        ranking
      })
    }
    function queueTask (props: {
      perform?: () => Promise<unknown>
      label: string
    }): void {
      const task = {
        perform: props.perform,
        label: props.label
      }
      void queue.add({ task })
    }
    function archive (archiveProps: {
      movieId: number
    }): void {
      function change (changeProps: { state: State<ListMovie> }): State<ListMovie> {
        const newState = archiveItem({
          itemId: archiveProps.movieId,
          state: changeProps.state
        })
        return newState
      }
      saveState({ change })
      const item = getCalculatedItem({ itemId: archiveProps.movieId, state })
      const label = `Archive ${item.name}`
      const body = {
        lastMergechoiceId: state.history[0].mergeChoiceId,
        listId: list.id,
        archive: {
          item
        }
      }
      async function perform (): Promise<void> {
        await postArchive({ body, label: 'archive' })
      }
      queueTask({ label, perform })
    }
    function choose (chooseProps: {
      betterIndex: number
    }): void {
      console.log('chooseProps.betterIndex', chooseProps.betterIndex)
      function change (changeProps: { state: State<ListMovie> }): State<ListMovie> {
        const chosenState = chooseOption({
          betterIndex: chooseProps.betterIndex,
          state: changeProps.state
        })
        console.log('chosenState', chosenState)
        debugChoice({ label: 'choose', choice: chosenState.choice, items: chosenState.items })
        if (historyFlag.flag) {
          openEpisode({ episodeId: chosenState.history[0].mergeChoiceId })
        } else {
          setOpenedEpisodes([chosenState.history[0].mergeChoiceId])
        }
        return chosenState
      }
      saveState({ change })
      const request = createMovieChoiceRequest({
        betterIndex: chooseProps.betterIndex,
        listId: list.id,
        state
      })
      async function perform (): Promise<void> {
        await postChoice({ request, label: request.label })
      }
      queueTask({ label: request.label, perform })
    }
    function defer (): void {
      if (defaultOptionIndex == null) {
        throw new Error('There is no defaultOptionIndex')
      }
      choose({ betterIndex: defaultOptionIndex })
    }
    async function importMovies (importMoviesProps: {
      movies: MovieData[]
      slice?: number
    } & AlwaysNever): Promise<void> {
      const sliced = shuffleSlice({
        items: importMoviesProps.movies,
        slice: importMoviesProps.slice
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
      queueTask({ label })
      function change (updateProps: { state: State<ListMovie> }): State<ListMovie> {
        if (response.import == null) {
          throw new Error('There is no import')
        }
        const newState = importItems({
          items: response.import.items,
          state: updateProps.state
        })
        return newState
      }
      saveState({ change })
    }
    function random (): void {
      function change (props: {
        state: State<ListMovie>
      }): State<ListMovie> {
        const newState = setupRandomChoice({ state: props.state })
        return newState
      }
      saveState({ change })
      const lastEpisode = state.history[0]
      const newEpisode = state.history[0]
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
      queueTask({ label, perform })
    }
    function removeMovie (deleteMovieProps: {
      movieId: number
    }): void {
      function change (changeProps: { state: State<ListMovie> }): State<ListMovie> {
        const newState = removeItem({
          itemId: deleteMovieProps.movieId,
          state: changeProps.state
        })
        return newState
      }
      saveState({ change })
      const item = getCalculatedItem({ itemId: deleteMovieProps.movieId, state })
      const label = `Remove ${item.name}`
      const body = {
        lastMergechoiceId: state.history[0].mergeChoiceId,
        listId: list.id,
        remove: {
          item
        }
      }
      async function perform (): Promise<void> {
        await postRemoveMovie({ body, label: 'removeMovie' })
      }
      queueTask({ label, perform })
    }
    function reset (resetProps: {
      movieId: number
    }): void {
      function change (updateProps: { state: State<ListMovie> }): State<ListMovie> {
        const newState = resetItem({
          itemId: resetProps.movieId,
          state: updateProps.state
        })
        return newState
      }
      saveState({ change })
      const item = getCalculatedItem({
        itemId: resetProps.movieId, state
      })
      const label = `Reset ${item.name}`
      const body = {
        lastMergechoiceId: state.history[0].mergeChoiceId,
        listId: list.id,
        reset: {
          item
        }
      }
      async function perform (): Promise<void> {
        await postReset({ body, label: 'reset' })
      }
      queueTask({ label, perform })
    }
    function rewind (rewindProps: {
      episodeMergechoiceId: number
    }): void {
      const lastEpisode = state.history[0]
      if (lastEpisode == null) {
        throw new Error('There is no lastEpisode')
      }
      const rewindIndex = getRewindIndex({
        episodeId: rewindProps.episodeMergechoiceId,
        history: state.history
      })

      const history = state.history.slice(rewindIndex + 1)
      rewindRestorePoints({ history })
      const restorePoint = restorePoints.find(point => point.episodeId === rewindProps.episodeMergechoiceId)
      if (restorePoint != null) {
        const newState = { ...restorePoint.listState, history }
        updateState({ newState })
        requestRewind({
          episodeId: rewindProps.episodeMergechoiceId,
          lastMergechoiceId: lastEpisode.mergeChoiceId,
          state: newState
        })
        return
      }
      setRewindIndex(0)
      const newRewindLength = state.history.length - rewindIndex - 1
      setRewindLength(newRewindLength)
      rewindAction.start()
      rewindWorkerRef.current?.postMessage({
        episodeId: rewindProps.episodeMergechoiceId,
        lastMergechoiceId: lastEpisode.mergeChoiceId,
        listId: list.id,
        state
      })
    }
    function unarchive (archiveProps: {
      movieId: number
    }): void {
      function change (changeProps: {
        state: State<ListMovie>
      }): State<ListMovie> {
        const newState = unarchiveItem({
          itemId: archiveProps.movieId,
          state: changeProps.state
        })
        return newState
      }
      saveState({ change })
      const item = state.archive[archiveProps.movieId]
      if (item == null) {
        throw new Error('There is no item')
      }
      const label = `Unarchive ${item.name}`
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
      async function perform (): Promise<void> {
        await postUnarchive({ body, label: 'archive' })
      }
      queueTask({ label, perform })
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
      exportCriticker,
      exportHistory,
      historyFlag,
      historySifter,
      importAction,
      removeMovie,
      movies: rankedMovies,
      moviesSifter,
      openedEpisodes,
      queue,
      random,
      randoming,
      range,
      reset,
      rewind,
      rewindAction,
      rewindIndex,
      rewindLength,
      sift,
      state,
      synced,
      toggleEpisode,
      unarchive
    }
    return value
  }
})
export default privateListContext
