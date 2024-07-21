import { Row } from '@/cell/cell-types'
import EpisodeCellsConsumer from './episode-cells-consumer'
import episodeContext from './episode-context'

export default function EpisodeCellsView (props: {
  row: Row<'episode'>
}): JSX.Element {
  const view = (
    <episodeContext.Provider episode={props.row.cells.episode}>
      <EpisodeCellsConsumer row={props.row} />
    </episodeContext.Provider>
  )
  return view
}
