import { Row } from '@/cell/cell-types'
import LabeledMovieCellsView from '@/movie/labeled-movie-cells-view'
import ThemeTdView from '@/theme/theme-td-view'
import RemoveIconView from './remove-icon-view'

export default function RemoveEpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <LabeledMovieCellsView movie={props.row.cells.movie}>
      <ThemeTdView>
        <RemoveIconView />
      </ThemeTdView>
    </LabeledMovieCellsView>
  )
  return view
}
