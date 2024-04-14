import ButtonView from '@/button/button-view'
import { useList } from '@/list/list-context'
import { useHotkeys } from 'react-hotkeys-hook'

export default function DeferConsumer (): JSX.Element {
  const list = useList()
  useHotkeys('d', list.defer)
  function handleClick (): void {
    list.defer()
  }
  return (
    <ButtonView onClick={handleClick}>
      [d] Defer
    </ButtonView>
  )
}
