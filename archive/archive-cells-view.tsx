import { MovieProvider } from '@/movie/movie-context'
import { CalculatedMovie } from '@/movie/movie-types'
import ArchiveCellsConsumer from './archive-cells-consumer'

export default function ArchiveCellsView (props: {
  row: CalculatedMovie
}): JSX.Element {
  return (
    <MovieProvider calculated={props.row}>
      <ArchiveCellsConsumer />
    </MovieProvider>
  )
}
