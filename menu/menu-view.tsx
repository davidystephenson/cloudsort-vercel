import { Menu, MenuList, MenuProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import MenuIconButton from './menu-icon-button'

export default function MenuView (props: {
  children: ReactNode
} & MenuProps): JSX.Element {
  return (
    <div>
      <Menu {...props}>
        <MenuIconButton />
        <MenuList zIndex={2}>
          {props.children}
        </MenuList>
      </Menu>
    </div>
  )
}
