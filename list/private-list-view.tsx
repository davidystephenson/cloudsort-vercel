'use client'

import deduceState from '@/mergechoice/deduceState'
import { Episode, State } from '../mergechoice/mergeChoiceTypes'
import PrivateListConsumer from './private-list-consumer'
import privateListContext from './private-list-context'
import { ListMovie } from '@/movie/movie-types'
import { useEffect, useState } from 'react'
import ListLoadingView from './list-loading-view'

export default function PrivateListView (props: {
  history: Array<Episode<ListMovie>>
  seed: string
}): JSX.Element {
  const [state, setState] = useState<State<ListMovie>>()
  useEffect(() => {
    const state = deduceState({
      history: props.history,
      seed: props.seed
    })
    setState(state)
  }, [props.history, props.seed])
  return (
    <ListLoadingView
      data={state}
      View={(props) => {
        const view = (
          <privateListContext.Provider state={props.data}>
            <PrivateListConsumer />
          </privateListContext.Provider>
        )
        return view
      }}
    />
  )
}
