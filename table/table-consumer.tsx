'use client'
import { Tr, Tbody } from '@chakra-ui/react'
import { useTheme } from '../theme/theme-context'
import ThemeTableView from '../theme/theme-table-view'
import ThemeTheadView from '../theme/theme-thead-view'
import TableHeaderView from './table-header-view'
import { Identity } from './table-types'
import TableWrapperView from './table-wrapper-view'
import VirtualTable from './virtual-table'

export default function TableConsumer<Row extends Identity> (props: {
  CellsView: (props: { row: Row }) => JSX.Element
  rows: Row[]
}): JSX.Element {
  const theme = useTheme()
  if (!theme.mounted) {
    const rows = props.rows.map((row) => {
      const id = ('id' in row) ? row.id : row.mergeChoiceId
      return (
        <Tr key={id}>
          <props.CellsView row={row} />
        </Tr>
      )
    })
    return (
      <TableWrapperView>
        <ThemeTableView>
          <ThemeTheadView>
            <TableHeaderView />
          </ThemeTheadView>
          <Tbody>
            {rows}
          </Tbody>
        </ThemeTableView>
      </TableWrapperView>
    )
  }
  return (
    <VirtualTable {...props} />
  )
}
