import { Row } from '@/cell/cell-types'
import episodeContext from '@/episode/episode-context'
import ChoiceEpisodeMovieCellsConsumer from './choice-episode-movie-cells-consumer'

export default function ChoiceEpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <episodeContext.Provider episode={props.row.cells.episode}>
      <ChoiceEpisodeMovieCellsConsumer row={props.row} />
    </episodeContext.Provider>
  )
  return view
}
