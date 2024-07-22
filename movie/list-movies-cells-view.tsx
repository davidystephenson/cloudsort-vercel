import { Row } from '@/cell/cell-types'
import listContext from '@/list/list-context'
import TableSpanView from '@/table/table-span-view'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import { Heading } from '@chakra-ui/react'

export default function ListMoviesCellsView (props: {
  row: Row<'listMovies'>
}): JSX.Element {
  const list = listContext.useContext()
  function handleClick (): void {
    list.moviesFlag.toggle()
  }
  return (
    <TableSpanView>
      <ThemeLinkableView href='#' onClick={handleClick}>
        <Heading size='sm'>
          Movies ({list.siftedEpisodes.length})
        </Heading>
      </ThemeLinkableView>
    </TableSpanView>
  )
}
