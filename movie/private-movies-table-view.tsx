'use client'

import TableView from '@/table/table-view'
import CellsView from '@/cell/cells-view'
import privateListContext from '@/list/private-list-context'
import usePrivateCellRows from '@/cell/use-private-cell-rows'
import OptionsView from '@/option/options-view'
import MoviesHeadingView from './movies-heading-view'

export default function PrivateMoviesTableView (): JSX.Element {
  const privateList = privateListContext.useContext()
  const columns = ['Movie', 'Seed', 'Points']
  const rows = usePrivateCellRows()
  return (
    <TableView
      CellsView={CellsView}
      rows={rows}
      columns={columns}
      filterRows={privateList.sift}
    >
      <MoviesHeadingView />
      <OptionsView />
    </TableView>
  )
}
