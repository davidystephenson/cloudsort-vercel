import { Row } from '@/cell/cell-types'
import LabeledMovieCellsView from '@/movie/labeled-movie-cells-view'
import ThemeTdView from '@/theme/theme-td-view'
import ResetIconView from './reset-icon-view'

export default function ResetEpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <LabeledMovieCellsView movie={props.row.cells.movie}>
      <ThemeTdView pr='0'>
        <ResetIconView />
      </ThemeTdView>
    </LabeledMovieCellsView>
  )
  return view
}
