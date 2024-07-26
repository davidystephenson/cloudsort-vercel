import privateListContext from '@/list/private-list-context'

export default function MinimumLabelView (): JSX.Element {
  const privateList = privateListContext.useContext()
  if (privateList.randoming) {
    return <span>1</span>
  }
  return <span>{privateList.range.minimum}</span>
}
