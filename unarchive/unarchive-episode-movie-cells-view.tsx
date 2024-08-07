import { Row } from '@/cell/cell-types'
import LabeledMovieCellsView from '@/movie/labeled-movie-cells-view'
import ThemeTdView from '@/theme/theme-td-view'
import { Icon } from '@chakra-ui/icons'
import { TbRefreshAlert } from 'react-icons/tb'

export default function UnarchiveEpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <LabeledMovieCellsView movie={props.row.cells.movie}>
      <ThemeTdView>
        <Icon as={TbRefreshAlert} />
      </ThemeTdView>
    </LabeledMovieCellsView>
  )
  return view
}
