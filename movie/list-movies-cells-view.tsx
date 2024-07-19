import { Row } from '@/cell/cell-types'
import listContext from '@/list/list-context'
import TableSpanView from '@/table/table-span-view'
import { Heading } from '@chakra-ui/react'

export default function ListMoviesCellsView (props: {
  row: Row<'listMovies'>
}): JSX.Element {
  const list = listContext.useContext()
  const movies = Object.values(list.state.items)
  return (
    <TableSpanView>
      <Heading size='sm'>
        Movies ({movies.length})
      </Heading>
    </TableSpanView>
  )
}
