import { Menu, MenuList, MenuProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import MenuIconButton from './menu-icon-button'

export default function MenuView (props: {
  children: ReactNode
} & MenuProps): JSX.Element {
  return (
    <Menu {...props}>
      <MenuIconButton />
      <MenuList zIndex={3}>
        {props.children}
      </MenuList>
    </Menu>
  )
}
