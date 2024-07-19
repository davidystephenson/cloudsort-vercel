import { Row } from '@/cell/cell-types'
import listContext from '@/list/list-context'
import getCalculatedItem from '@/mergechoice/getCalculatedItem'
import MovieCellsConsumer from './movie-cells-consumer'
import { MovieProvider } from './movie-context'

export default function ListMovieCellsView (props: {
  row: Row<'listMovie'>
}): JSX.Element {
  const list = listContext.useContext()
  const movie = getCalculatedItem({
    itemId: props.row.cells.movieId,
    state: list.state
  })
  return (
    <MovieProvider calculated={movie}>
      <MovieCellsConsumer />
    </MovieProvider>
  )
}
