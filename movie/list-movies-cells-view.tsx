import { Row } from '@/cell/cell-types'
import listContext from '@/list/list-context'
import TableSpanView from '@/table/table-span-view'
import { Heading } from '@chakra-ui/react'

export default function ListMoviesCellsView (props: {
  row: Row<'listMovies'>
}): JSX.Element {
  const list = listContext.useContext()
  return (
    <TableSpanView>
      <Heading size='sm'>
        Movies ({list.siftedEpisodes.length})
      </Heading>
    </TableSpanView>
  )
}
