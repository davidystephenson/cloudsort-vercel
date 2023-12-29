import { MdDeleteForever } from 'react-icons/md'
import { useList } from './list-context'
import SendRequestView from '../request/send-request-view'

export default function ListCellsConsumer (): JSX.Element {
  const list = useList()
  async function send (): Promise<void> {
    await list.deleteRow()
  }
  return (
    <>
      <td className='w-full'>{list.row.name}</td>
      <td>
        <SendRequestView
          aria-label='Delete'
          color='danger'
          isIconOnly
          send={send}
          size='sm'
          variant='light'
        >
          <MdDeleteForever className='h-[55%] w-max' />
        </SendRequestView>
      </td>
    </>
  )
}
