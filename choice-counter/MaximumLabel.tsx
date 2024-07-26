import privateListContext from '@/list/private-list-context'
import RandomIconView from '@/random/random-icon-view'

export default function MaximumLabelView (): JSX.Element {
  const privateList = privateListContext.useContext()
  if (privateList.randoming) {
    return <RandomIconView />
  }
  return <span>{privateList.range.maximum}</span>
}
