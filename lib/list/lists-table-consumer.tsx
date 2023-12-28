'use client'
import { TableVirtuoso } from 'react-virtuoso'
import TableHeaderView from '../table/table-header-view'
import TableWrapperView from '../table/table-wrapper-view'
import ListCellsView from './list-cells-view'
import { useLists } from './lists-context'
import { useTheme } from '../theme/theme-context'

export default function ListsTableConsumer (): JSX.Element {
  const theme = useTheme()
  const lists = useLists()
  if (!theme.mounted) {
    const rows = lists.filteredRows.map((row) => (
      <tr key={row.id}>
        <ListCellsView row={row} />
      </tr>
    ))
    return (
      <TableWrapperView>
        <table>
          <thead>
            <TableHeaderView />
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </TableWrapperView>
    )
  }
  return (
    <TableWrapperView>
      <TableVirtuoso
        style={{ height: '100%' }}
        data={lists.filteredRows}
        fixedHeaderContent={TableHeaderView}
        itemContent={(index, row) => (
          <ListCellsView row={row} />
        )}
      />
    </TableWrapperView>
  )
}
