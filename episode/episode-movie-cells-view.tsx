import { Row } from '@/cell/cell-types'
import episodeContext from './episode-context'
import EpisodeMovieCellsConsumer from './episode-movie-cells-consumer'
import movieContext from '@/movie/movie-context'

export default function EpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <episodeContext.Provider episode={props.row.cells.episode}>
      <movieContext.Provider calculated={props.row.cells.movie}>
        <EpisodeMovieCellsConsumer row={props.row} />
      </movieContext.Provider>
    </episodeContext.Provider>
  )
  return view
}
