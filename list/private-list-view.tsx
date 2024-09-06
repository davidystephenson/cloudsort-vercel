'use client'

import { ListMovie } from '@/movie/movie-types'
import { Episode, State } from '../mergechoice/mergeChoiceTypes'
import PrivateListConsumer from './private-list-consumer'
import privateListContext from './private-list-context'
import { DeduceMessage, DeduceHandlers } from '@/deduce/deduce-types'
import DeducingView from '@/deduce/DeducingView'
import { useState, useEffect, useCallback, useMemo } from 'react'
import onDeduce from '@/deduce/onDeduce'
import useWorkerRef from '@/worker/useWorkerRef'

export default function PrivateListView (props: {
  history: Array<Episode<ListMovie>>
  seed: string
}): JSX.Element {
  const [index, setIndex] = useState(0)
  const [state, setState] = useState<State<ListMovie>>()
  const deduceWorker = useMemo(() => {
    return new Worker(new URL('../deduce/deduce-worker.ts', import.meta.url))
  }, [])
  const handleMessage = useCallback((handleMessageProps: {
    event: MessageEvent<DeduceMessage>
  }) => {
    console.log('props.event.data', handleMessageProps.event.data)
    const handlers: DeduceHandlers = {
      episode: (episodeProps) => {
        setIndex(episodeProps.message.index)
      },
      state: (stateProps) => {
        setState(stateProps.message.state)
      }
    }
    onDeduce({
      key: handleMessageProps.event.data.type,
      message: handleMessageProps.event.data,
      receivers: handlers
    })
  }, [])
  const deduceWorkerRef = useWorkerRef({
    onMessage: handleMessage,
    worker: deduceWorker
  })
  useEffect(() => {
    deduceWorkerRef.current?.postMessage({
      history: props.history,
      seed: props.seed
    })
  }, [])
  if (state == null) {
    return (
      <DeducingView
        index={index}
        length={props.history.length}
      />
    )
  }
  return (
    <privateListContext.Provider state={state}>
      <PrivateListConsumer />
    </privateListContext.Provider>
  )
}
