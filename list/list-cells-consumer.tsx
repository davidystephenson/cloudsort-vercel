import ThemeLinkableView from '../theme/theme-linkable-view'
import { List } from '@prisma/client'
import { useLists } from './lists-context'
import DeleteIconButtonView from '../delete-button/delete-icon-button-view'
import ThemeTdView from '../theme/theme-td-view'

export default function ListCellsConsumer (props: {
  list: List
}): JSX.Element {
  const lists = useLists()
  async function send (): Promise<void> {
    await lists.delete({ id: props.list.id })
  }
  const href = `/list/${props.list.id}`
  return (
    <>
      <ThemeTdView w='100%'>
        <ThemeLinkableView href={href}>
          {props.list.name}
        </ThemeLinkableView>
      </ThemeTdView>
      <ThemeTdView>
        <DeleteIconButtonView send={send} />
      </ThemeTdView>
    </>
  )
}
