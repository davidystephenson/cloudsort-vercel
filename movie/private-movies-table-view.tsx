'use client'

import TableView from '@/table/table-view'
import CellsView from '@/cell/cells-view'
import privateListContext from '@/list/private-list-context'
import usePrivateCellRows from '@/cell/use-private-cell-rows'
import moviesContext from './movies-context'
import OptionsView from '@/option/options-view'
import MoviesHeadingView from './movies-heading-view'

export default function PrivateMoviesTableView (): JSX.Element {
  const movies = moviesContext.useContext()
  const privateList = privateListContext.useContext()
  const columns = ['Movie', 'Seed', 'Points', '']
  const rows = usePrivateCellRows()
  function filterRows (props: {
    query: string | undefined
  }): void {
    movies.sifter.sift({ query: props.query })
    privateList.archiveSifter.sift({ query: props.query })
    privateList.historySifter.sift({ query: props.query })
  }
  return (
    <TableView
      CellsView={CellsView}
      rows={rows}
      columns={columns}
      filterRows={filterRows}
    >
      <MoviesHeadingView />
      <OptionsView />
    </TableView>
  )
}
