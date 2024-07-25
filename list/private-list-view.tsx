'use client'

import postHistory from '@/history/post-history'
import { ListMovie } from '@/movie/movie-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { State } from '../mergechoice/mergeChoiceTypes'
import { useListContext } from './list-context'
import ListLoadingView from './list-loading-view'
import privateListContext from './private-list-context'
import PrivateListConsumer from './private-list-consumer'

export default function PrivateListView (): JSX.Element {
  const list = useListContext()
  const workerRef = useRef<Worker>()
  const [state, setState] = useState<State<ListMovie>>()
  const handleWork = useCallback(async () => {
    const history = await postHistory({
      body: {
        listId: list.id
      },
      label: 'create'
    })
    workerRef.current?.postMessage(history)
  }, [])
  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/worker.ts', import.meta.url))
    workerRef.current.onmessage = (event: {
      data: string
    }) => {
      const state = JSON.parse(event.data)
      setState(state)
    }
    void handleWork()
    return () => {
      workerRef.current?.terminate()
    }
  }, [])
  if (state == null) {
    return (
      <ListLoadingView />
    )
  }
  return (
    <privateListContext.Provider
      state={state}
    >
      <PrivateListConsumer />
    </privateListContext.Provider>
  )
}
