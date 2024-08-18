import { Menu, MenuList, MenuProps } from '@chakra-ui/react'
import { ReactNode } from 'react'
import MenuIconButton from './menu-icon-button'

export default function MenuView (props: {
  children: ReactNode
} & MenuProps): JSX.Element {
  return (
    <div style={{ zIndex: 2 }}>
      <Menu {...props}>
        <MenuIconButton />
        <MenuList zIndex={1000}>
          {props.children}
        </MenuList>
      </Menu>
    </div>
  )
}
