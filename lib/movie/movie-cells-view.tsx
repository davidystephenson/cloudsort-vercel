import { Movie } from '@prisma/client'
import { MovieProvider } from '../movie/movie-context'
import MovieCellsConsumer from './movie-cells-consumer'

export default function MovieCellsView (props: {
  row: Movie
}): JSX.Element {
  return (
    <MovieProvider calculated={props.row}>
      <MovieCellsConsumer />
    </MovieProvider>
  )
}
