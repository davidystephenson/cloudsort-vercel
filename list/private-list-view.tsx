'use client'

import postHistory from '@/history/post-history'
import { ListMovie } from '@/movie/movie-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { State } from '../mergechoice/mergeChoiceTypes'
import MoviesHeadingView from '../movie/movies-heading-view'
import MoviesTableView from '../movie/movies-table-view'
import OptionsView from '../option/options-view'
import ListLoadingView from './list-loading-view'
import privateListContext from './private-list-context'
import { useListContext } from './list-context'

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
    console.log('worker effect')
    workerRef.current = new Worker(new URL('../workers/worker.ts', import.meta.url))
    workerRef.current.onmessage = (event: {
      data: string
    }) => {
      const dataType = typeof event.data
      console.log(`WebWorker Response Type => ${dataType}`)
      const state = JSON.parse(event.data)
      console.log('state:', state)
      setState(state)
    }
    void handleWork()
    return () => {
      workerRef.current?.terminate()
    }
  }, [])
  if (state == null) {
    return <ListLoadingView />
  }
  return (
    <privateListContext.Provider
      state={state}
    >
      <MoviesHeadingView />
      <OptionsView />
      <MoviesTableView />
    </privateListContext.Provider>
  )
}
