import TableSearchView from './table-search-view'
import { useTable } from './table-context'
import { Th, Tr } from '@chakra-ui/react'

export default function TableHeaderView (): JSX.Element {
  const table = useTable()
  const columns = table.columns.map((column, index) => {
    return (
      <Th key={column}>
        {column}
      </Th>
    )
  })
  const colSpan = table.columns.length + 1
  return (
    <>
      <Tr background='var(--chakra-colors-chakra-body-bg)'>
        <Th py='0' colSpan={colSpan}>
          <TableSearchView />
        </Th>
      </Tr>
      <Tr>
        {columns}
        <Th />
      </Tr>
    </>
  )
}
