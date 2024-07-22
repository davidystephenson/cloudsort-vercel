import { Menu, MenuList } from '@chakra-ui/react'
import { ReactNode } from 'react'
import MenuIconButton from './menu-icon-button'

export default function MenuView (props: {
  children: ReactNode
}): JSX.Element {
  return (
    <Menu>
      <MenuIconButton />
      <MenuList>
        {props.children}
      </MenuList>
    </Menu>
  )
}
