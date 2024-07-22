'use client'

import { ListProvider } from './list-context'
import MoviesTableView from '../movie/movies-table-view'
import { State } from '../mergechoice/mergeChoiceTypes'
import OptionsView from '../option/options-view'
import MoviesHeadingView from '../movie/movies-heading-view'
import { ListMovie } from '@/movie/movie-types'

export default function ListView (props: {
  id: number
  name: string
  seed: string
  state: State<ListMovie>
  userId: number
}): JSX.Element {
  return (
    <ListProvider
      id={props.id}
      name={props.name}
      seed={props.seed}
      state={props.state}
      userId={props.userId}
    >
      <MoviesHeadingView />
      <OptionsView />
      <MoviesTableView />
    </ListProvider>
  )
}
