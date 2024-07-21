import { Row } from '@/cell/cell-types'
import LabeledMovieCellsView from '@/movie/labeled-movie-cells-view'
import ThemeTdView from '@/theme/theme-td-view'
import { DeleteIcon } from '@chakra-ui/icons'

export default function RemoveEpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <LabeledMovieCellsView movie={props.row.cells.movie}>
      <ThemeTdView>
        <DeleteIcon />
      </ThemeTdView>
    </LabeledMovieCellsView>
  )
  return view
}
