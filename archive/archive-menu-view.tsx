import MenuView from '@/menu/menu-view'
import { useMovie } from '@/movie/movie-context'
import { useTheme } from '@/theme/theme-context'
import { DeleteIcon } from '@chakra-ui/icons'
import { Icon, MenuItem } from '@chakra-ui/react'
import { LuArchiveRestore } from 'react-icons/lu'

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
    <MenuView>
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
    </MenuView>
  )
}
