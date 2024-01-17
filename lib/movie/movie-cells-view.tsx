import { MovieProvider } from '../movie/movie-context'
import MovieCellsConsumer from './movie-cells-consumer'
import { CalculatedMovie } from './movie-types'

export default function MovieCellsView (props: {
  row: CalculatedMovie
}): JSX.Element {
  return (
    <MovieProvider calculated={props.row}>
      <MovieCellsConsumer />
    </MovieProvider>
  )
}
