import { DeleteIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react'
import { LuArchiveRestore, LuMoreVertical } from 'react-icons/lu'
import { useTheme } from '@/theme/theme-context'
import { useMovie } from '@/movie/movie-context'

export default function ArchiveMenu (): JSX.Element {
  const movie = useMovie()
  const theme = useTheme()
  const color = theme.darkened ? 'pink' : 'red'
  function handleRemove (): void {
    void movie.remove()
  }
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Menu'
        icon={<LuMoreVertical />}
        isDisabled={!theme.mounted}
        size='xs'
        variant='ghost'
      />
      <MenuList>
        <MenuItem icon={<LuArchiveRestore />}>
          Unarchive
        </MenuItem>
        <MenuItem icon={<DeleteIcon color={color} />} onClick={handleRemove} color={color}>
          Remove
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
