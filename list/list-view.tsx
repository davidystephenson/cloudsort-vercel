'use client'

import { ListProvider } from './list-context'
import MoviesTableView from '../movie/movies-table-view'
import { RelatedList } from './list-types'
import { State } from '../mergechoice/mergeChoiceTypes'
import OptionsView from '../option/options-view'
import MoviesHeadingView from '../movie/movies-heading-view'
import { ListMovie } from '@/movie/movie-types'

export default function ListView (props: {
  state: State<ListMovie>
  row: RelatedList
}): JSX.Element {
  return (
    <ListProvider
      id={props.row.id}
      name={props.row.name}
      seed={props.row.seed}
      state={props.state}
      userId={props.row.userId}
    >
      <MoviesHeadingView />
      <OptionsView />
      <MoviesTableView />
    </ListProvider>
  )
}
