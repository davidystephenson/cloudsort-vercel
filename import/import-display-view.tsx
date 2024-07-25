import ActionDisplayView from '@/action/action-display-view'
import privateListContext from '@/list/private-list-context'

export default function ImportDisplayView (): JSX.Element {
  const privateList = privateListContext.useContext()
  return <ActionDisplayView action={privateList.importAction} />
}
