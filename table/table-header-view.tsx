import TableSearchView from './table-search-view'
import { useTable } from './table-context'
import { Tr } from '@chakra-ui/react'
import ThemeThView from '../theme/theme-th-view'
import TableColumnsView from './table-columns-view'

export default function TableHeaderView (): JSX.Element {
  const table = useTable()
  const colSpan = table.columns.length
  return (
    <>
      <Tr>
        <ThemeThView py='0' colSpan={colSpan}>
          <TableSearchView />
        </ThemeThView>
      </Tr>
      <Tr>
        <TableColumnsView />
      </Tr>
    </>
  )
}
