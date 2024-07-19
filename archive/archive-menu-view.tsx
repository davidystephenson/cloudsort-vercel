import { useMovie } from '@/movie/movie-context'
import { useTheme } from '@/theme/theme-context'
import { DeleteIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Icon } from '@chakra-ui/react'
import { LuArchiveRestore, LuMoreVertical } from 'react-icons/lu'

export default function ArchiveMenuView (): JSX.Element {
  const movie = useMovie()
  const theme = useTheme()
  const color = theme.darkened ? 'pink' : 'red'
  function handleRemove (): void {
    movie.remove()
  }
  function handleUnarchive (): void {
    movie.unarchive()
  }
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<Icon as={LuMoreVertical} />}
        size='xs'
        variant='ghost'
      />
      <MenuList>
        <MenuItem
          icon={<Icon as={LuArchiveRestore} />}
          onClick={handleUnarchive}
        >
          Unarchive
        </MenuItem>
        <MenuItem
          icon={<DeleteIcon color={color} />} color={color}
          onClick={handleRemove}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
