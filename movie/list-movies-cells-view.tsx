import { Row } from '@/cell/cell-types'
import privateListContext from '@/list/private-list-context'
import TableSpanView from '@/table/table-span-view'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import { Heading } from '@chakra-ui/react'

export default function ListMoviesCellsView (props: {
  row: Row<'listMovies'>
}): JSX.Element {
  const list = privateListContext.useContext()
  function handleClick (): void {
    list.moviesFlag.toggle()
  }
  return (
    <TableSpanView>
      <ThemeLinkableView href='#' onClick={handleClick}>
        <Heading size='sm'>
          Movies ({list.siftedMovies.length})
        </Heading>
      </ThemeLinkableView>
    </TableSpanView>
  )
}
