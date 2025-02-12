import { useCallback, useEffect, useMemo, useState } from 'react'
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
import { AddTask } from '@/useQueue/useQueueTypes'
import debugChoice from '@/mergechoice/debugChoice'

export default function useRewind (props: {
  listId: number
  onState: (props: {
    episodeId: number
    lastMergechoiceId: number
    state: ListState
  }) => void
  queueTask: AddTask
  state: ListState
  updateState: (props: {
    newState: State<ListMovie>
  }) => void
}): Rewind {
  const [restorePoints, setRestorePoints] = useState<RestorePoint[]>([])
  useEffect(() => {
    console.log('restorePoints', restorePoints)
    const first = restorePoints[0]
    if (first == null) {
      return
    }
    debugChoice({
      choice: first.listSnapshot.choice,
      label: 'restorePoints choice',
      items: first.listSnapshot.items
    })
  }, [restorePoints])
  const savePoint = useCallback((savePointProps: {
    newState: State<ListMovie>
    state: State<ListMovie>
  }) => {
    console.log('savePoint state', savePointProps.state)
    debugChoice({
      choice: savePointProps.state.choice,
      label: 'savePoint',
      items: savePointProps.state.items
    })
    const { history, ...listSnapshot } = savePointProps.state
    const newEpisode = savePointProps.newState.history[0]
    const restorePoint: RestorePoint = {
      episodeId: newEpisode.mergeChoiceId,
      listSnapshot
    }
    console.log('savePoint restorePoints', restorePoints)
    const lastNine = restorePoints.slice(-9)
    console.log('lastNine', lastNine)
    const newRestorePoints = [...lastNine, restorePoint]
    console.log('newRestorePoints', newRestorePoints)
    setRestorePoints(newRestorePoints)
  }, [restorePoints])
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
    void props.queueTask({ label, perform: remote })
  }, [props.queueTask, props.listId])
  const handlers: RewindHandlers = useMemo(() => {
    return {
      episode: (props) => {
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
    console.log('restorePoints', restorePoints)
    const restorePoint = restorePoints.find(point => {
      return point.episodeId === startProps.episodeMergechoiceId
    })
    console.log('restorePoint', restorePoint)
    if (restorePoint != null) {
      console.log('if')
      const newState = { ...restorePoint.listSnapshot, history }
      props.updateState({ newState })
      request({
        episodeId: startProps.episodeMergechoiceId,
        lastMergechoiceId: lastEpisode.mergeChoiceId,
        state: newState
      })
      return
    }
    console.log('else')
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
  const rewind: Rewind = useMemo(() => {
    return {
      action,
      index,
      length,
      marx,
      savePoint,
      start
    }
  }, [action, index, length, marx, savePoint, start])
  return rewind
}
