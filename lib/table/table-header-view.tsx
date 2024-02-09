import TableSearchView from './table-search-view'
import { useTable } from './table-context'
import { Tr } from '@chakra-ui/react'
import ThemeThView from '../theme/theme-th-view'

export default function TableHeaderView (): JSX.Element {
  const table = useTable()
  const columns = table.columns.map((column, index) => {
    return (
      <ThemeThView key={column}>
        {column}
      </ThemeThView>
    )
  })
  const colSpan = table.columns.length
  return (
    <>
      <Tr>
        <ThemeThView py='0' colSpan={colSpan}>
          <TableSearchView />
        </ThemeThView>
      </Tr>
      <Tr>
        {columns}
      </Tr>
    </>
  )
}
