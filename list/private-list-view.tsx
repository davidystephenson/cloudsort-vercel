'use client'

import DeducingView from '@/deduce/DeducingView'
import { ListMovie } from '@/movie/movie-types'
import { Episode } from '../mergechoice/mergeChoiceTypes'
import PrivateListConsumer from './private-list-consumer'
import privateListContext from './private-list-context'
import useDeduce from '@/deduce/useDeduce'

export default function PrivateListView (props: {
  history: Array<Episode<ListMovie>>
  seed: string
}): JSX.Element {
  const deduction = useDeduce(props)
  if (deduction.state == null) {
    return (
      <DeducingView
        index={deduction.index}
        length={props.history.length}
      />
    )
  }
  return (
    <privateListContext.Provider state={deduction.state}>
      <PrivateListConsumer />
    </privateListContext.Provider>
  )
}
