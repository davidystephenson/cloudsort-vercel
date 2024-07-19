import { Row } from '@/cell/cell-types'
import episodeContext from './episode-context'
import useEpisode from './use-episode'
import EpisodeMovieCellsConsumer from './episode-movie-cells-consumer'

export default function EpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const episode = useEpisode({ episodeId: props.row.cells.episodeId })
  const view = (
    <episodeContext.Provider episode={episode}>
      <EpisodeMovieCellsConsumer row={props.row} />
    </episodeContext.Provider>
  )
  return view
}
