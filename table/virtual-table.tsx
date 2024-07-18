'use client'
import { TableComponents, TableVirtuoso } from 'react-virtuoso'
import TableHeaderView from './table-header-view'
import { Identity } from './table-types'
import { Box, Tr, Tbody } from '@chakra-ui/react'
import { forwardRef } from 'react'
import ThemeTheadView from '../theme/theme-thead-view'
import ThemeTableView from '../theme/theme-table-view'

export default function VirtualTable<Row extends Identity> (props: {
  CellsView: (props: { row: Row }) => JSX.Element
  rows: Row[]
}): JSX.Element {
  const Scroller: TableComponents['Scroller'] = forwardRef((props, ref) => {
    return <Box {...props} ref={ref} />
  })
  const tableComponents: TableComponents<Row> = {
    Scroller,
    Table: ThemeTableView,
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
