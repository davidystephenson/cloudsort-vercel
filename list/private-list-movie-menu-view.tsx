import HideMenuItemsView from '@/hide/hide-menu-items-view'
import MenuView from '@/menu/menu-view'
import { useMovie } from '@/movie/movie-context'
import { useTheme } from '@/theme/theme-context'
import { DeleteIcon } from '@chakra-ui/icons'
import { Icon, MenuItem } from '@chakra-ui/react'
import { LuArchive } from 'react-icons/lu'
import { TbRefreshAlert } from 'react-icons/tb'
import privateListContext from './private-list-context'
import MenuLoadingView from '@/menu/MenuLoadingView'

export default function PrivateListMovieMenuView (): JSX.Element {
  const list = privateListContext.useContext()
  const movie = useMovie()
  const theme = useTheme()
  if (list.choice.action.active) {
    return <MenuLoadingView />
  }
  const color = theme.darkened ? 'pink' : 'red'
  function handleArchive (): void {
    movie.archive()
  }
  function handleRemove (): void {
    movie.remove()
  }
  function handleReset (): void {
    movie.reset()
  }
  return (
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
  )
}
