'use client'

import TableView from '@/table/table-view'
import { useList } from '../list/list-context'
import useSifted from '@/sifted/use-sifted'
import CellsView from '@/cell/cells-view'

export default function MoviesTableView (): JSX.Element {
  const list = useList()
  const columns = ['Movie', 'Seed', 'Points']
  const sifted = useSifted()
  return (
    <TableView
      CellsView={CellsView}
      rows={sifted}
      columns={columns}
      filterRows={list.siftMovies}
    />
  )
}
