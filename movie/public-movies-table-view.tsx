'use client'

import TableView from '@/table/table-view'
import CellsView from '@/cell/cells-view'
import usePublicCellRows from '@/cell/use-public-cell-rows'
import moviesContext from './movies-context'
import { useListContext } from '@/list/list-context'
import HeadingView from '@/heading/heading-view'

export default function PublicMoviesTableView (): JSX.Element {
  const list = useListContext()
  const movies = moviesContext.useContext()
  const columns = ['Movie', 'Seed', 'Points']
  const rows = usePublicCellRows()
  return (
    <TableView
      CellsView={CellsView}
      rows={rows}
      columns={columns}
      filterRows={movies.sifter.sift}
    >
      <HeadingView>
        {list.name}
      </HeadingView>
    </TableView>
  )
}
