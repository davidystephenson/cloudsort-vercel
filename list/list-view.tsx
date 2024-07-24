'use client'

import { ListProvider } from './list-context'
import MoviesTableView from '../movie/movies-table-view'
import { State } from '../mergechoice/mergeChoiceTypes'
import OptionsView from '../option/options-view'
import MoviesHeadingView from '../movie/movies-heading-view'
import { ListMovie } from '@/movie/movie-types'
import { useRef, useEffect, useCallback, useState } from 'react'
import { Heading, Spinner } from '@chakra-ui/react'
import postHistory from '@/history/post-history'

export default function ListView (props: {
  id: number
  name: string
  seed: string
  userId: number
}): JSX.Element {
  const workerRef = useRef<Worker>()
  const [state, setState] = useState<State<ListMovie>>()
  const handleWork = useCallback(async () => {
    const history = await postHistory({
      body: {
        listId: props.id
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
    return (
      <>
        <Heading size='lg'>{props.name}</Heading>
        <Spinner />
      </>
    )
  }
  return (
    <ListProvider
      id={props.id}
      name={props.name}
      seed={props.seed}
      state={state}
      userId={props.userId}
    >
      <MoviesHeadingView />
      <OptionsView />
      <MoviesTableView />
    </ListProvider>
  )
}
