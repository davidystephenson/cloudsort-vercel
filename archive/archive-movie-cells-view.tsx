import { MovieProvider } from '@/movie/movie-context'
import ArchiveMovieCellsConsumer from './archive-movie-cells-consumer'
import { Row } from '@/cell/cell-types'
import getCalculatedItem from '@/mergechoice/getCalculatedItem'
import { useList } from '@/list/list-context'

export default function ArchiveMovieCellsView (props: {
  row: Row<'archiveMovie'>
}): JSX.Element {
  const list = useList()
  const movie = getCalculatedItem({
    itemId: props.row.cells.movieId,
    state: list.state
  })
  return (
    <MovieProvider calculated={movie}>
      <ArchiveMovieCellsConsumer />
    </MovieProvider>
  )
}
