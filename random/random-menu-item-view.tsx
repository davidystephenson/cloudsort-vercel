import privateListContext from '@/list/private-list-context'
import { MenuItem } from '@chakra-ui/react'
import RandomIconView from './random-icon-view'

export default function RandomMenuItemView (): JSX.Element {
  const list = privateListContext.useContext()
  if (!list.state.complete) {
    return <></>
  }
  function handleClick (): void {
    list.random()
  }
  const view = (
    <MenuItem
      icon={<RandomIconView />}
      onClick={handleClick}
    >
      Random
    </MenuItem>
  )
  return view
}
