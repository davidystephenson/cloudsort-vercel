import { IconButton, Menu, MenuButton, MenuProps, Spinner } from '@chakra-ui/react'

export default function MenuLoadingView (props: Omit<MenuProps, 'children'>): JSX.Element {
  return (
    <Menu {...props}>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<Spinner size='xs' />}
        isDisabled
        size='xs'
        variant='ghost'
      />
    </Menu>
  )
}
