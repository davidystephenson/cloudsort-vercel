'use client'

import { List, Movie } from '@prisma/client'
import { ListProvider } from './list-context'
import CreateMovieFormView from '../movie/create-movie-form-view'

export default function ListsView (props: {
  movies: Movie[]
  row: List
}): JSX.Element {
  return (
    <ListProvider movies={props.movies} row={props.row}>
      <div className='text-3xl'>List</div>
      <div className='text-2xl'>{props.row.name}</div>
      <CreateMovieFormView />
    </ListProvider>
  )
}
