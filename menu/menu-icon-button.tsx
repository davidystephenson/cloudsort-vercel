import { MenuButton, IconButton, Icon } from '@chakra-ui/react'
import { LuMoreVertical } from 'react-icons/lu'

export default function MenuIconButton (): JSX.Element {
  return (
    <MenuButton
      as={IconButton}
      aria-label='Options'
      icon={<Icon as={LuMoreVertical} />}
      size='xs'
      variant='ghost'
    />
  )
}
