import privateListContext from '@/list/private-list-context'
import DeferConsumer from './defer-consumer'

export default function DeferView (): JSX.Element {
  const privateList = privateListContext.useContext()
  if (privateList.defaultOptionIndex == null) {
    return <></>
  }
  return (
    <DeferConsumer />
  )
}
