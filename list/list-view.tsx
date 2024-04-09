'use client'

import { ListProvider } from './list-context'
import MoviesTableView from '../movie/movies-table-view'
import { MovieState, RelatedList } from './list-types'
import OptionsView from '../option/options-view'
import MoviesHeadingView from '../movie/movies-heading-view'

export default function ListView (props: {
  state: MovieState
  row: RelatedList
}): JSX.Element {
  return (
    <ListProvider state={props.state} row={props.row}>
      <MoviesHeadingView />
      <OptionsView />
      <MoviesTableView />
    </ListProvider>
  )
}
