'use client'

import TableView from '@/table/table-view'
import ListCellsView from './list-cells-view'
import { useLists } from './lists-context'

export default function ListsTableView (): JSX.Element {
  const lists = useLists()
  const columns = ['Name', '']
  return (
    <TableView
      CellsView={ListCellsView}
      columns={columns}
      filterRows={lists.filter}
      rows={lists.filtered}
    />
  )
}
