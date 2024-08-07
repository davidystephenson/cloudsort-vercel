import HideMenuItemsView from '@/hide/hide-menu-items-view'
import MenuView from '@/menu/menu-view'
import { useMovie } from '@/movie/movie-context'
import { useTheme } from '@/theme/theme-context'
import { DeleteIcon } from '@chakra-ui/icons'
import { HStack, Icon, MenuItem } from '@chakra-ui/react'
import { LuArchive } from 'react-icons/lu'
import { TbRefreshAlert } from 'react-icons/tb'

export default function PrivateListMovieMenuView (): JSX.Element {
  const movie = useMovie()
  const theme = useTheme()
  const color = theme.darkened ? 'pink' : 'red'
  function handleArchive (): void {
    movie.archive()
  }
  function handleRemove (): void {
    movie.unarchive()
  }
  function handleReset (): void {
    movie.reset()
  }
  return (
    <HStack gap='0'>
      <MenuView>
        <HideMenuItemsView />
        <MenuItem
          color={color}
          icon={<Icon as={LuArchive} color={color} />}
          onClick={handleArchive}
        >
          Archive
        </MenuItem>
        <MenuItem
          color={color}
          icon={<Icon as={TbRefreshAlert} color={color} />}
          onClick={handleReset}
        >
          Reset
        </MenuItem>
        <MenuItem
          color={color}
          icon={<DeleteIcon color={color} />}
          onClick={handleRemove}
        >
          Remove
        </MenuItem>
      </MenuView>
    </HStack>
  )
}
