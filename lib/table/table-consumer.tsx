'use client'
import { TableComponents, TableVirtuoso } from 'react-virtuoso'
import TableHeaderView from './table-header-view'
import TableWrapperView from './table-wrapper-view'
import { useTheme } from '../theme/theme-context'
import { Identity } from './table-types'
import { Box, Table, Tr, Tbody } from '@chakra-ui/react'
import { forwardRef } from 'react'
import ThemeTheadView from '../theme/theme-thead-view'

export default function TableConsumer<Row extends Identity> (props: {
  CellsView: (props: { row: Row }) => JSX.Element
  rows: Row[]
}): JSX.Element {
  const theme = useTheme()
  if (!theme.mounted) {
    const rows = props.rows.map((row) => (
      <Tr key={row.id}>
        <props.CellsView row={row} />
      </Tr>
    ))
    return (
      <TableWrapperView>
        <Table size='sm'>
          <ThemeTheadView>
            <TableHeaderView />
          </ThemeTheadView>
          <Tbody>
            {rows}
          </Tbody>
        </Table>
      </TableWrapperView>
    )
  }
  const Scroller: TableComponents['Scroller'] = forwardRef((props, ref) => {
    return <Box {...props} ref={ref} />
  })
  const tableComponents: TableComponents<Row> = {
    Scroller,
    Table: (props) => <Table {...props} size='sm' />,
    TableBody: forwardRef((props, ref) => <Tbody {...props} ref={ref} />),
    TableHead: ThemeTheadView,
    TableRow: Tr
  }
  return (
    <TableVirtuoso
      components={tableComponents}
      style={{ height: '100%' }}
      data={props.rows}
      useWindowScroll
      fixedHeaderContent={TableHeaderView}
      itemContent={(index, row) => (
        <props.CellsView row={row} />
      )}
    />
  )
}
