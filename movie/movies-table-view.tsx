'use client'

import TableView from '@/table/table-view'
import useSifted from '@/sifted/use-sifted'
import CellsView from '@/cell/cells-view'
import privateListContext from '@/list/private-list-context'

export default function MoviesTableView (): JSX.Element {
  const list = privateListContext.useContext()
  const columns = ['Movie', 'Seed', 'Points']
  const sifted = useSifted()
  return (
    <TableView
      CellsView={CellsView}
      rows={sifted}
      columns={columns}
      filterRows={list.sift}
    />
  )
}
