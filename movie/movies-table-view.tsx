'use client'

import { useList } from '../list/list-context'
import { TableProvider } from '../table/table-context'
import MoviesTableConsumer from './movies-table-consumer'

export default function MoviesTableView (): JSX.Element {
  const list = useList()
  const columns = ['Name', 'Seed', 'Points']
  return (
    <TableProvider
      columns={columns}
      filterRows={list.filter}
    >
      <MoviesTableConsumer />
    </TableProvider>
  )
}
