import { useAuthContext } from '@/auth/auth-context'
import HideIconView from '@/hide/hide-icon-view'
import MenuView from '@/menu/menu-view'
import { useMovie } from '@/movie/movie-context'
import { useTheme } from '@/theme/theme-context'
import { DeleteIcon } from '@chakra-ui/icons'
import { HStack, Icon, MenuItem } from '@chakra-ui/react'
import { LuArchive } from 'react-icons/lu'
import { TbRefreshAlert } from 'react-icons/tb'

export default function PrivateListMovieMenuView (): JSX.Element {
  const auth = useAuthContext()
  const movie = useMovie()
  const theme = useTheme()
  const color = theme.darkened ? 'pink' : 'red'
  function handleArchive (): void {
    movie.archive()
  }
  function handleHide (): void {
    void movie.hide()
  }
  function handleRemove (): void {
    movie.unarchive()
  }
  function handleReset (): void {
    movie.reset()
  }
  const hidden = auth.itemHides?.some((itemHide) => itemHide.itemId === movie.calculated.id)
  const hideIconView = hidden === true && <HideIconView />
  return (
    <HStack>
      {hideIconView}
      <MenuView>
        <MenuItem
          icon={<HideIconView />}
          onClick={handleHide}
        >
          Hide
        </MenuItem>
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
