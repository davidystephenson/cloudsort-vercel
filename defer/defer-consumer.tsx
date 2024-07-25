import ButtonView from '@/button/button-view'
import privateListContext from '@/list/private-list-context'
import { useHotkeys } from 'react-hotkeys-hook'

export default function DeferConsumer (): JSX.Element {
  const privateList = privateListContext.useContext()
  useHotkeys('d', privateList.defer)
  function handleClick (): void {
    privateList.defer()
  }
  return (
    <ButtonView onClick={handleClick}>
      [d] Defer
    </ButtonView>
  )
}
