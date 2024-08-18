'use client'

import useAction from '@/action/use-action'
import { DeduceHandlers, DeduceMessage } from '@/deduce/deduce-types'
import handleDeduce from '@/deduce/handle-deduce'
import { ListMovie } from '@/movie/movie-types'
import { useTheme } from '@/theme/theme-context'
import { useEffect, useRef, useState } from 'react'
import { Episode, State } from '../mergechoice/mergeChoiceTypes'
import DeducingView from '../deduce/DeducingView'
import ListMultiloaderView from './list-multiloader-view'
import PrivateListConsumer from './private-list-consumer'
import privateListContext from './private-list-context'

export default function PrivateListView (props: {
  history: Array<Episode<ListMovie>>
  seed: string
}): JSX.Element {
  const theme = useTheme()
  const [index, setIndex] = useState(0)
  const [state, setState] = useState<State<ListMovie>>()
  const deduceAction = useAction()
  const deduceWorkerRef = useRef<Worker>()
  useEffect(() => {
    deduceWorkerRef.current = new Worker(new URL('../deduce/deduce-worker.ts', import.meta.url))
    deduceWorkerRef.current.onmessage = (event: MessageEvent<DeduceMessage>) => {
      const handlers: DeduceHandlers = {
        episode: (props) => {
          setIndex(props.message.index)
        },
        state: (props) => {
          setState(props.message.state)
        }
      }
      handleDeduce({
        key: event.data.type,
        message: event.data,
        receivers: handlers
      })
      deduceAction.succeed()
    }
    return () => {
      deduceWorkerRef.current?.terminate()
    }
  }, [deduceAction.succeed])
  useEffect(() => {
    deduceWorkerRef.current?.postMessage({
      history: props.history,
      seed: props.seed
    })
  }, [props.history, props.seed])
  if (!theme.mounted) {
    return <ListMultiloaderView />
  }
  if (state == null) {
    return (
      <DeducingView index={index} length={props.history.length} />
    )
  }
  return (
    <privateListContext.Provider state={state}>
      <PrivateListConsumer />
    </privateListContext.Provider>
  )
}
