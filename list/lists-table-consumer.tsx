'use client'
import ListCellsView from './list-cells-view'
import { useLists } from './lists-context'
import TableConsumer from '../table/table-consumer'

export default function ListsTableConsumer (): JSX.Element {
  const lists = useLists()
  return (
    <TableConsumer
      CellsView={ListCellsView}
      rows={lists.filtered}
    />
  )
}
