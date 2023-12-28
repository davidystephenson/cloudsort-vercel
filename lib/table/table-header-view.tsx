import TableSearchView from './table-search-view'
import { useTable } from './table-context'
import { cn } from '@nextui-org/react'

export default function TableHeaderView (): JSX.Element {
  const table = useTable()
  const columns = table.columns.map((column, index) => {
    const first = index === 0
    const firstClass = first && 'w-full'
    const className = cn(firstClass, 'text-left')
    return (
      <th key={column} className={className}>
        {column}
      </th>
    )
  })
  const colSpan = table.columns.length + 1
  return (
    <>
      <tr>
        <th colSpan={colSpan} className='pb-2'>
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
