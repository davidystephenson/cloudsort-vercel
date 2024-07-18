'use client'

import TableView from '@/table/table-view'
import { useLists } from './lists-context'
import ListCellsView from './list-cells-view'

export default function ListsTableView (): JSX.Element {
  const lists = useLists()
  const columns = ['Name', '']
  return (
    <TableView
      columns={columns}
      filter={lists.filter}
      CellsView={ListCellsView}
      rows={lists.filtered}
    />
  )
}
