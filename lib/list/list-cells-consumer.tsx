import { MdDeleteForever } from 'react-icons/md'
import SendRequestView from '../request/send-request-view'
import ThemeIconView from '../theme/theme-icon-view'
import ThemeLinkableView from '../theme/theme-linkable-view'
import { List } from '@prisma/client'
import { useLists } from './lists-context'

export default function ListCellsConsumer (props: {
  list: List
}): JSX.Element {
  const lists = useLists()
  async function send (): Promise<void> {
    lists.delete({ id: props.list.id })
  }
  const href = `/list/${props.list.id}`
  return (
    <>
      <td className='w-full'>
        <ThemeLinkableView href={href}>
          {props.list.name}
        </ThemeLinkableView>
      </td>
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
