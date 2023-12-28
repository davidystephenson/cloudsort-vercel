import { useRef } from 'react'
import { Table, TableBody, TableRow, TableCell, TableHeader } from './native-table'
import { useVirtualizer, notUndefined } from '@tanstack/react-virtual'
import {
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import ThemeButtonView from '../theme/theme-button-view'

const data = [...Array(10_000)].map((_, i) => ({ id: i, name: 'test' }))

export default function TanTable (): JSX.Element {
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

  const [before, after] =
    items.length > 0
      ? [
          notUndefined(items[0]).start - virtualizer.options.scrollMargin,
          virtualizer.getTotalSize() - notUndefined(items[items.length - 1]).end
        ]
      : [0, 0]

  return (
    <>
      <div>Virtual Subgrid Table</div>
      <div ref={parentRef} style={{ height: '500px', overflow: 'auto' }}>
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`
          }}
        >
          <Table>
            <TableHeader className='sticky top-0 bg-white text-black'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {before > 0 && (
                <TableRow>
                  <TableCell
                    className='col-span-full'
                    style={{ height: before }}
                  />
                </TableRow>
              )}

              {items.map((virtualRow, index) => {
                const row = rows[virtualRow.index]

                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      )
                    })}
                    <TableCell>
                      <ThemeButtonView>Test</ThemeButtonView>
                    </TableCell>
                  </TableRow>
                )
              })}

              {after > 0 && (
                <TableRow>
                  <TableCell
                    className='col-span-full'
                    style={{ height: after }}
                  />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
