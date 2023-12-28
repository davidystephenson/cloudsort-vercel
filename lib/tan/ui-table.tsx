'use client'

import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Table, TableHeader, TableRow, TableCell, TableBody, TableColumn } from '@nextui-org/react'

const data = [...Array(10_000)].map((_, i) => ({ id: i, name: 'test' }))

export default function UiTable (): JSX.Element {
  const parentRef = useRef(null)

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID'
    },
    {
      accessorKey: 'name',
      header: 'Name'
    }
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 26,
    overscan: 4
  })

  const { rows } = table.getRowModel()
  const items = virtualizer.getVirtualItems()

  // const [before, after] =
  //   items.length > 0
  //     ? [
  //         notUndefined(items[0]).start - virtualizer.options.scrollMargin,
  //         virtualizer.getTotalSize() - notUndefined(items[items.length - 1]).end
  //       ]
  //     : [0, 0]

  const headers = table.getHeaderGroups().flatMap((headerGroup) => {
    return headerGroup.headers
  })
  const headerViews = headers.map((header) => {
    return (
      <TableColumn key={header.id}>
        {flexRender(
          header.column.columnDef.header,
          header.getContext()
        )}
      </TableColumn>
    )
  })
  console.log('headers', headers)
  console.log('rows', rows)
  console.log('items', items)
  const rowViews = items.map((virtualRow, index) => {
    const row = rows[virtualRow.index]

    const cells = row.getVisibleCells().map((cell) => {
      return (
        <TableCell key={cell.id}>
          {flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          )}
        </TableCell>
      )
    })
    return (
      <TableRow key={row.id}>
        {cells}
      </TableRow>
    )
  })

  return (
    <>
      <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`
          }}
        >
          <Table aria-label='Example table with dynamic content'>
            <TableHeader>
              {headerViews}
            </TableHeader>
            <TableBody>
              {rowViews}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
