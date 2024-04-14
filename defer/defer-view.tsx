import { useList } from '@/list/list-context'
import DeferConsumer from './defer-consumer'

export default function DeferView (): JSX.Element {
  const list = useList()
  if (list.defaultOptionIndex == null) {
    return <></>
  }
  return (
    <DeferConsumer />
  )
}
