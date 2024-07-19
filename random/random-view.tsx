import ButtonView from '@/button/button-view'
import { useList } from '@/list/list-context'

export default function RandomView (): JSX.Element {
  const list = useList()
  if (!list.state.complete) {
    return <></>
  }
  const items = Object.values(list.state.items)
  if (items.length < 2) {
    throw new Error('There must be at least two active items to create a random choice')
  }
  function handleClick (): void {
    list.random()
  }
  const view = (
    <ButtonView onClick={handleClick}>
      Random
    </ButtonView>
  )
  return view
}
