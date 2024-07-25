'use client'

import TableView from '@/table/table-view'
import CellsView from '@/cell/cells-view'
import privateListContext from '@/list/private-list-context'
import usePrivateCellRows from '@/cell/use-private-cell-rows'

export default function PrivateMoviesTableView (): JSX.Element {
  const list = privateListContext.useContext()
  const columns = ['Movie', 'Seed', 'Points']
  const rows = usePrivateCellRows()
  return (
    <TableView
      CellsView={CellsView}
      rows={rows}
      columns={columns}
      filterRows={list.sift}
    />
  )
}
