import ThemeLinkableView from '../theme/theme-linkable-view'
import { List } from '@prisma/client'
import { useLists } from './lists-context'
import DeleteIconButtonView from '../delete-button/delete-icon-button-view'

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
        <DeleteIconButtonView send={send} />
      </td>
    </>
  )
}
