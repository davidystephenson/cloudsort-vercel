import useAction from '@/action/use-action'
import postArchive from '@/archive/post-archive'
import postChoice from '@/choice/post-choice'
import siftEpisode from '@/episode/sift-episode'
import downloadRankingFile from '@/file/downloadRankingFile'
import downloadFile from '@/file/downloadFile'
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
import moviesToRanking from '@/ranking/moviesToRanking'
import postReset from '@/reset/post-reset'
import shuffleSlice from '@/shuffleSlice/shuffleSlice'
import { AlwaysNever } from '@/shuffleSlice/shuffleSliceTypes'
import useSifter from '@/sifter/use-sifter'
import postUnarchive from '@/unarchive/post-unarchive'
import useQueue from '@/useQueue/useQueue'
import contextCreator from 'context-creator'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import chooseOption from '../mergechoice/chooseOption'
import { State } from '../mergechoice/mergeChoiceTypes'
import removeItem from '../mergechoice/removeItem'
import { CreateMoviesRequest, ListMovie, MovieData } from '../movie/movie-types'
import postMovies from '../movie/post-movies'
import siftMovie from '../movie/sift-movie'
import getSortedMovies from '../movies/getSortedMovies'
import { useListContext } from './list-context'
import { useOptionalLists } from './lists-context'
import downloadCritickerFile from '@/file/downloadCritickerFile'
import useRewind from '@/rewind/useRewind'
import useChoice from '@/choice/useChoice'

const privateListContext = contextCreator({
  name: 'privateList',
  useValue: (props: {
    state: State<ListMovie>
  }) => {
    const list = useListContext()
    const lists = useOptionalLists()
    const queue = useQueue()
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
    const rewind = useRewind({
      listId: list.id,
      onState: resetSifters,
      queueTask: queue.add,
      state,
      updateState
    })
    const saveState = useCallback((saveStateProps: {
      newState: State<ListMovie>
    }) => {
      rewind.savePoint({ newState: saveStateProps.newState, state })
      updateState({ newState: saveStateProps.newState })
    }, [state])

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
    function exportCriticker (): void {
      const ranking = moviesToRanking({ sortedMovies })
      downloadCritickerFile({
        listId: list.id,
        listName: list.name,
        ranking
      })
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
    function exportRanking (): void {
      const ranking = moviesToRanking({ sortedMovies })
      downloadRankingFile({
        listId: list.id,
        listName: list.name,
        ranking
      })
    }
    function archive (archiveProps: {
      movieId: number
    }): void {
      const newState = archiveItem({
        itemId: archiveProps.movieId,
        state
      })
      saveState({ newState })
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
      void queue.add({ label, perform })
    }
    const choice = useChoice({
      listId: list.id,
      onChoose: (props) => {
        if (historyFlag.raised) {
          openEpisode({ episodeId: props.state.history[0].mergeChoiceId })
        } else {
          setOpenedEpisodes([props.state.history[0].mergeChoiceId])
        }
      },
      queue,
      state
    })
    void choice

    function choose (chooseProps: {
      betterIndex: number
    }): void {
      const request = createMovieChoiceRequest({
        betterIndex: chooseProps.betterIndex,
        listId: list.id,
        state
      })
      async function perform (): Promise<void> {
        await postChoice({ request, label: request.label })
      }
      void queue.add({ label: request.label, perform })
      const newState = chooseOption({
        betterIndex: chooseProps.betterIndex,
        state
      })
      if (historyFlag.raised) {
        openEpisode({ episodeId: newState.history[0].mergeChoiceId })
      } else {
        setOpenedEpisodes([newState.history[0].mergeChoiceId])
      }
      saveState({ newState })
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
      void queue.add({ label })
      const newState = importItems({
        items: response.import.items,
        state
      })
      saveState({ newState })
    }
    function random (): void {
      const newState = setupRandomChoice({ state })
      saveState({ newState })
      const lastEpisode = state.history[0]
      const newEpisode = newState.history[0]
      if (newEpisode.random == null) {
        throw new Error('There is no random')
      }
      const body = {
        lastMergechoiceId: lastEpisode.mergeChoiceId,
        listId: list.id,
        random: newEpisode.random
      }
      async function perform (): Promise<void> {
        await postRandom({ body, label: 'random' })
      }
      const label = 'Create random choice'
      void queue.add({ label, perform })
    }
    function removeMovie (deleteMovieProps: {
      movieId: number
    }): void {
      const newState = removeItem({
        itemId: deleteMovieProps.movieId,
        state
      })
      saveState({ newState })
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
      void queue.add({ label, perform })
    }
    function reset (resetProps: {
      movieId: number
    }): void {
      const newState = resetItem({
        itemId: resetProps.movieId,
        state
      })
      saveState({ newState })
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
      void queue.add({ label, perform })
    }
    function unarchive (archiveProps: {
      movieId: number
    }): void {
      const newState = unarchiveItem({
        itemId: archiveProps.movieId,
        state
      })
      saveState({ newState })
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
      void queue.add({ label, perform })
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
      exportRanking,
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
