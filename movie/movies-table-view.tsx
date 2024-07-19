'use client'

import TableView from '@/table/table-view'
import { useList } from '../list/list-context'
import MovieCellsView from './movie-cells-view'

export default function MoviesTableView (): JSX.Element {
  const list = useList()
  const columns = ['Movie', 'Seed', 'Points']
  return (
    <TableView
      CellsView={MovieCellsView}
      rows={list.filteredMovies}
      columns={columns}
      filterRows={list.filterMovies}
    />
  )
}
