import { useListContext } from './list-context'

export default function PublicListView (): JSX.Element {
  const list = useListContext()
  return (
    <>Public List {list.name}</>
  )
}
