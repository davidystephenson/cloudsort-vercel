import { Row } from '@/cell/cell-types'
import TableSpanView from '@/table/table-span-view'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import { Heading } from '@chakra-ui/react'
import moviesContext from './movies-context'

export default function ListMoviesCellsView (props: {
  row: Row<'listMovies'>
}): JSX.Element {
  const movies = moviesContext.useContext()
  function handleClick (): void {
    movies.flag.toggle()
  }
  return (
    <TableSpanView>
      <ThemeLinkableView href='#' onClick={handleClick}>
        <Heading size='sm'>
          Movies ({movies.sifter.sifted.length})
        </Heading>
      </ThemeLinkableView>
    </TableSpanView>
  )
}
