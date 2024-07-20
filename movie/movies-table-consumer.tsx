'use client'
import { useList } from '../list/list-context'
import MovieCellsView from './movie-cells-view'
import TableConsumer from '../table/table-consumer'

export default function MoviesTableConsumer (): JSX.Element {
  const list = useList()
  return (
    <TableConsumer
      CellsView={MovieCellsView}
      rows={list.siftedMovies}
    />
  )
}
