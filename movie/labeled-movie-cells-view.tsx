import { MovieProvider } from '@/movie/movie-context'
import MovieLabelCellsView from '@/movie/movie-label-cells-view'
import { ReactNode } from 'react'
import { CalculatedMovie } from './movie-types'

export default function LabeledMovieCellsView (props: {
  children: ReactNode
  movie: CalculatedMovie
}): JSX.Element {
  const view = (
    <MovieProvider calculated={props.movie}>
      <MovieLabelCellsView />
      {props.children}
    </MovieProvider>
  )
  return view
}
