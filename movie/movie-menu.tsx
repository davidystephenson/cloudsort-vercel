import { DeleteIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react'
import { LuArchive, LuMoreVertical } from 'react-icons/lu'
import { useMovie } from './movie-context'
import { useTheme } from '@/theme/theme-context'

export default function MovieMenu (props: {
  mounted?: boolean
}): JSX.Element {
  const movie = useMovie()
  const theme = useTheme()
  const color = theme.darkened ? 'pink' : 'red'
  function handleArchive (): void {
    void movie.archive()
  }
  function handleRemove (): void {
    void movie.remove()
  }
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Menu'
        icon={<LuMoreVertical />}
        size='xs'
        variant='ghost'
      />
      <MenuList>
        <MenuItem icon={<LuArchive color={color} />} onClick={handleArchive} color={color}>
          Archive
        </MenuItem>
        <MenuItem icon={<DeleteIcon color={color} />} onClick={handleRemove} color={color}>
          Remove
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
