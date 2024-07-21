import { Row } from '@/cell/cell-types'
import episodeContext from '@/episode/episode-context'
import LabeledMovieCellsView from '@/movie/labeled-movie-cells-view'
import ThemeTdView from '@/theme/theme-td-view'

export default function ChoiceEpisodeMovieCellsConsumer (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const episode = episodeContext.useContext()
  const view = (
    <LabeledMovieCellsView movie={props.row.cells.movie}>
      <ThemeTdView>
        {episode.element.mergeChoiceId}
      </ThemeTdView>
    </LabeledMovieCellsView>
  )
  return view
}
