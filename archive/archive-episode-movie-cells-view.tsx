import { Row } from '@/cell/cell-types'
import { useList } from '@/list/list-context'
import getCalculatedItem from '@/mergechoice/getCalculatedItem'
import { MovieProvider } from '@/movie/movie-context'
import MovieLabelCellsView from '@/movie/movie-label-cells-view'
import ThemeTdView from '@/theme/theme-td-view'
import { Icon } from '@chakra-ui/react'
import { LuArchive } from 'react-icons/lu'

export default function ArchiveEpisodeMovieCellsView (props: {
  row: Row<'episodeMovie'>
}): JSX.Element {
  const list = useList()
  const movie = getCalculatedItem({
    itemId: props.row.cells.movieId,
    state: list.state
  })
  const view = (
    <MovieProvider calculated={movie}>
      <MovieLabelCellsView />
      <ThemeTdView pr='0'>
        <Icon as={LuArchive} />
      </ThemeTdView>
    </MovieProvider>
  )
  return view
}
