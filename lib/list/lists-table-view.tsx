'use client'

import { TableProvider } from '../table/table-context'
import { useLists } from './lists-context'
import ListsTableConsumer from './lists-table-consumer'

export default function ListsTableView (): JSX.Element {
  const lists = useLists()
  const columns = ['Name']
  return (
    <TableProvider
      columns={columns}
      rows={lists.filteredRows}
      filterRows={lists.filterRows}
    >
      <ListsTableConsumer />
    </TableProvider>
  )
}
