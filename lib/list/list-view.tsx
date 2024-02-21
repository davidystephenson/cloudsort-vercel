'use client'

import { Movie } from '@prisma/client'
import { ListProvider } from './list-context'
import MoviesTableView from '../movie/movies-table-view'
import { RelatedList } from './list-types'
import { State } from '../mergeChoice/merge-choice-types'
import ChooseView from '../choose/choose-view'
import MoviesHeadingView from '../movie/movies-heading-view'

export default function ListView (props: {
  state: State<Movie>
  row: RelatedList
}): JSX.Element {
  return (
    <ListProvider state={props.state} row={props.row}>
      <ChooseView />
      <MoviesHeadingView />
      <MoviesTableView />
    </ListProvider>
  )
}
