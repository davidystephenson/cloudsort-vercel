import { Row } from '@/cell/cell-types'
import LabeledMovieCellsView from '@/movie/labeled-movie-cells-view'
import ThemeTdView from '@/theme/theme-td-view'
import { Icon } from '@chakra-ui/react'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'

export default function RandomEpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <LabeledMovieCellsView movie={props.row.cells.movie}>
      <ThemeTdView>
        <Icon as={GiPerspectiveDiceSixFacesRandom} />
      </ThemeTdView>
    </LabeledMovieCellsView>
  )
  return view
}
