import { MdDeleteForever } from 'react-icons/md'
import { useList } from './list-context'
import SendRequestView from '../request/send-request-view'
import ThemeIconView from '../theme/theme-icon-view'

export default function ListCellsConsumer (): JSX.Element {
  const list = useList()
  async function send (): Promise<void> {
    await list.delete()
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
          <ThemeIconView Icon={MdDeleteForever} />
        </SendRequestView>
      </td>
    </>
  )
}
