import { Row } from '@/cell/cell-types'
import LabeledMovieCellsView from '@/movie/labeled-movie-cells-view'
import ThemeTdView from '@/theme/theme-td-view'
import { Icon } from '@chakra-ui/react'
import { BsCloudUpload } from 'react-icons/bs'

export default function ImportEpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const view = (
    <LabeledMovieCellsView movie={props.row.cells.movie}>
      <ThemeTdView>
        <Icon as={BsCloudUpload} />
      </ThemeTdView>
    </LabeledMovieCellsView>
  )
  return view
}
