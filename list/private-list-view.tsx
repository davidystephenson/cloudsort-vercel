'use client'

import { Episode, State } from '../mergechoice/mergeChoiceTypes'
import PrivateListConsumer from './private-list-consumer'
import privateListContext from './private-list-context'
import { ListMovie } from '@/movie/movie-types'
import { useEffect, useRef, useState } from 'react'
import useAction from '@/action/use-action'
import { useTheme } from '@/theme/theme-context'
import ListLoaderView from './list-loader-view'
import ListMultiloaderView from './list-multiloader-view'

export default function PrivateListView (props: {
  history: Array<Episode<ListMovie>>
  seed: string
}): JSX.Element {
  const theme = useTheme()
  const [state, setState] = useState<State<ListMovie>>()
  const deduceAction = useAction()
  const deduceWorkerRef = useRef<Worker>()
  useEffect(() => {
    deduceWorkerRef.current = new Worker(new URL('../deduce/deduce-worker.ts', import.meta.url))
    deduceWorkerRef.current.onmessage = (event: MessageEvent<State<ListMovie>>) => {
      setState(event.data)
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
    return <ListLoaderView />
  }
  return (
    <privateListContext.Provider state={state}>
      <PrivateListConsumer />
    </privateListContext.Provider>
  )
}
