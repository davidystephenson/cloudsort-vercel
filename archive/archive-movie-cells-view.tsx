import { MovieProvider } from '@/movie/movie-context'
import ArchiveMovieCellsConsumer from './archive-movie-cells-consumer'
import { Row } from '@/cell/cell-types'

export default function ArchiveMovieCellsView (props: {
  row: Row<'archiveMovie'>
}): JSX.Element {
  return (
    <MovieProvider movie={props.row.cells.movie}>
      <ArchiveMovieCellsConsumer />
    </MovieProvider>
  )
}
