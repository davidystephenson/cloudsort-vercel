import { MovieProvider } from './movie-context'
import MovieCellsConsumer from './movie-cells-consumer'
import { CalculatedMovie } from './movie-types'

export default function MovieCellsView (props: {
  mounted?: boolean
  row: CalculatedMovie
}): JSX.Element {
  return (
    <MovieProvider calculated={props.row}>
      <MovieCellsConsumer mounted={props.mounted} />
    </MovieProvider>
  )
}
