'use client'

import deduceState from '@/mergechoice/deduceState'
import { Episode } from '../mergechoice/mergeChoiceTypes'
import ListLoadingView from './list-loading-view'
import PrivateListConsumer from './private-list-consumer'
import privateListContext from './private-list-context'
import { ListMovie } from '@/movie/movie-types'

export default function PrivateListView (props: {
  history: Array<Episode<ListMovie>>
  seed: string
}): JSX.Element {
  const state = deduceState({
    history: props.history,
    seed: props.seed
  })
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
