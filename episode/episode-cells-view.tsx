import { Row } from '@/cell/cell-types'
import EpisodeCellsConsumer from './episode-cells-consumer'
import episodeContext from './episode-context'
import useEpisode from './use-episode'

export default function EpisodeCellsView (props: {
  row: Row<'episode'>
}): JSX.Element {
  const episode = useEpisode({ episodeId: props.row.cells.episodeId })
  const view = (
    <episodeContext.Provider episode={episode}>
      <EpisodeCellsConsumer row={props.row} />
    </episodeContext.Provider>
  )
  return view
}
