import { Button } from '@nextui-org/react'
import { MdDeleteForever } from 'react-icons/md'
import { useList } from './list-context'

export default function ListCellsConsumer (): JSX.Element {
  const list = useList()
  return (
    <>
      <td className='w-full'>{list.row.name}</td>
      <td>
        <Button
          isIconOnly
          color='danger'
          aria-label='Delete'
          size='sm'
          variant='light'
        >
          <MdDeleteForever className='h-[55%] w-max' />
        </Button>
      </td>
    </>
  )
}
