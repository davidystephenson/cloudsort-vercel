'use client'
import { TableVirtuoso } from 'react-virtuoso'
import TableHeaderView from './table-header-view'
import TableWrapperView from './table-wrapper-view'
import { useTheme } from '../theme/theme-context'
import { Identity } from './table-types'

export default function TableConsumer <Row extends Identity> (props: {
  CellsView: (props: { row: Row }) => JSX.Element
  rows: Row[]
}): JSX.Element {
  const theme = useTheme()
  if (!theme.mounted) {
    const rows = props.rows.map((row) => (
      <tr key={row.id}>
        <props.CellsView row={row} />
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
        data={props.rows}
        fixedHeaderContent={TableHeaderView}
        itemContent={(index, row) => (
          <props.CellsView row={row} />
        )}
      />
    </TableWrapperView>
  )
}
