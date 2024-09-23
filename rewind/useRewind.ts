import { useCallback, useMemo, useState } from 'react'
import { Rewind, RewindHandlers } from './rewindTypes'
import useRewindMarx from './useRewindMarx'
import useAction from '@/action/use-action'
import { ListState } from '@/list/list-types'
import getRewindIndex from '@/mergechoice/getRewindIndex'
import { State } from '@/mergechoice/mergeChoiceTypes'
import { ListMovie } from '@/movie/movie-types'
import { RestorePoint } from '@/restore/restoreTypes'
import { ListHistory } from '@/history/history-types'
import postRewind from './post-rewind'

export default function useRewind (props: {
  listId: number
  onState: (props: {
    episodeId: number
    lastMergechoiceId: number
    state: ListState
  }) => void
  queueTask: (props: {
    perform?: () => Promise<unknown>
    label: string
  }) => void
  state: ListState
  updateState: (props: {
    newState: State<ListMovie>
  }) => void
}): Rewind {
  const [restorePoints, setRestorePoints] = useState<RestorePoint[]>([])
  const savePoint = useCallback((savePointProps: {
    change: (props: { state: State<ListMovie> }) => State<ListMovie>
    state: State<ListMovie>
  }) => {
    const { history, ...listSnapshot } = savePointProps.state
    const cloneBefore = structuredClone(savePointProps.state)
    const newState = savePointProps.change({ state: cloneBefore })
    const newEpisode = newState.history[0]
    const restorePoint: RestorePoint = {
      episodeId: newEpisode.mergeChoiceId,
      listSnapshot
    }
    const [first, ...rest] = restorePoints
    const newRestorePoints = [...rest, restorePoint]
    if (first != null && newRestorePoints.length < 10) {
      newRestorePoints.unshift(first)
    }
    setRestorePoints(newRestorePoints)
    return newState
  }, [])
  const [index, setIndex] = useState(0)
  const [length, setLength] = useState<number>()
  const action = useAction()
  const request = useCallback((requestRewindProps: {
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
        listId: props.listId,
        snapshot: json
      }
      await postRewind({
        label,
        request
      })
    }
    props.queueTask({ label, perform: remote })
  }, [props.queueTask, props.listId])
  const handlers: RewindHandlers = useMemo(() => {
    return {
      episode: (props) => {
        console.log('useRewind episode', props)
        setIndex(props.index)
      },
      state: (stateProps) => {
        console.log('useRewind state', stateProps)
        action.succeed()
        request({
          episodeId: stateProps.episodeId,
          lastMergechoiceId: stateProps.lastMergechoiceId,
          state: stateProps.state
        })
        props.updateState({ newState: stateProps.state })
        props.onState({
          episodeId: stateProps.episodeId,
          lastMergechoiceId: stateProps.lastMergechoiceId,
          state: stateProps.state
        })
      }
    }
  }, [action.succeed, props.onState, props.updateState])
  const marx = useRewindMarx({ actors: handlers })
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
  const start = useCallback((startProps: {
    episodeMergechoiceId: number
  }) => {
    const lastEpisode = props.state.history[0]
    if (lastEpisode == null) {
      throw new Error('There is no lastEpisode')
    }
    const rewindIndex = getRewindIndex({
      episodeId: startProps.episodeMergechoiceId,
      history: props.state.history
    })

    const history = props.state.history.slice(rewindIndex + 1)
    console.log('rewoundHistory', history)
    rewindRestorePoints({ history })
    const restorePoint = restorePoints.find(point => point.episodeId === startProps.episodeMergechoiceId)
    if (restorePoint != null) {
      const newState = { ...restorePoint.listSnapshot, history }
      props.updateState({ newState })
      request({
        episodeId: startProps.episodeMergechoiceId,
        lastMergechoiceId: lastEpisode.mergeChoiceId,
        state: newState
      })
      return
    }
    setIndex(0)
    const newRewindLength = props.state.history.length - rewindIndex - 1
    setLength(newRewindLength)
    action.start()
    marx.post({
      episodeId: startProps.episodeMergechoiceId,
      lastMergechoiceId: lastEpisode.mergeChoiceId,
      listId: props.listId,
      state: props.state
    })
  }, [props.listId, request, action.start, marx.post, restorePoints, props.state, props.updateState])
  const rewind: Rewind = {
    action,
    index,
    length,
    marx,
    savePoint,
    start
  }
  return rewind
}
