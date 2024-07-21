import { Row } from '@/cell/cell-types'
import episodeContext from './episode-context'
import EpisodeMovieCellsConsumer from './episode-movie-cells-consumer'

export default function EpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <episodeContext.Provider episode={props.row.cells.episode}>
      <EpisodeMovieCellsConsumer row={props.row} />
    </episodeContext.Provider>
  )
  return view
}