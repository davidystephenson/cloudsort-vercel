'use client'

import { ListProvider } from './list-context'
import MoviesTableView from '../movie/movies-table-view'
import { RelatedList } from './list-types'
import { State } from '../mergechoice/mergeChoiceTypes'
import OptionsView from '../option/options-view'
import MoviesHeadingView from '../movie/movies-heading-view'
import { ListMovie } from '@/movie/movie-types'
import HistoryView from '@/history/history-view'

export default function ListView (props: {
  state: State<ListMovie>
  row: RelatedList
}): JSX.Element {
  return (
    <ListProvider state={props.state} row={props.row}>
      <MoviesHeadingView />
      <OptionsView />
      <HistoryView />
      <MoviesTableView />
    </ListProvider>
  )
}
