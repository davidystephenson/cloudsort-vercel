'use client'

import TableView from '@/table/table-view'
import CellsView from '@/cell/cells-view'
import publicListContext from '@/list/public-list-context'
import usePublicCellRows from '@/cell/use-public-cell-rows'

export default function PublicMoviesTableView (): JSX.Element {
  const list = publicListContext.useContext()
  const columns = ['Movie', 'Seed', 'Points']
  const rows = usePublicCellRows()
  return (
    <TableView
      CellsView={CellsView}
      rows={rows}
      columns={columns}
      filterRows={list.movieSifter.sift}
    />
  )
}
