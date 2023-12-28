'use client'
import { TableVirtuoso } from 'react-virtuoso'
import { MdDeleteForever } from 'react-icons/md'
import { Button } from '@nextui-org/react'
import { useTable } from '../table/table-context'
import TableHeaderView from '../table/table-header-view'

export default function ListsTableView (): JSX.Element {
  const table = useTable()
  return (
    <div className='mt-4 pl-4 pr-4 pb-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full h-full'>
      <TableVirtuoso
        style={{ height: '100%' }}
        data={table.filteredRows}
        fixedHeaderContent={TableHeaderView}
        itemContent={(index, item) => (
          <>
            <td className='w-full'>{item.name}</td>
            <td>
              <Button isIconOnly color='danger' aria-label='Delete' size='sm' variant='light'>
                <MdDeleteForever className='h-[55%] w-max' />
              </Button>
            </td>
          </>
        )}
      />
    </div>
  )
}
