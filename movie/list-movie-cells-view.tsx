import { Row } from '@/cell/cell-types'
import MovieCellsConsumer from './movie-cells-consumer'
import { MovieProvider } from './movie-context'

export default function ListMovieCellsView (props: {
  row: Row<'listMovie'>
}): JSX.Element {
  const view = (
    <MovieProvider item={props.row.cells.movie}>
      <MovieCellsConsumer />
    </MovieProvider>
  )
  return view
}
