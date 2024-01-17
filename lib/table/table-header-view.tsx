import TableSearchView from './table-search-view'
import { useTable } from './table-context'

export default function TableHeaderView (): JSX.Element {
  const table = useTable()
  const columns = table.columns.map((column, index) => {
    // const first = index === 0
    return (
      <th key={column}>
        {column}
      </th>
    )
  })
  const colSpan = table.columns.length + 1
  return (
    <>
      <tr>
        <th colSpan={colSpan} className='pb-2 bg-white'>
          <TableSearchView />
        </th>
      </tr>
      <tr>
        {columns}
        <th />
      </tr>
    </>
  )
}
