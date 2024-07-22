import { useMovie } from '@/movie/movie-context'
import { useTheme } from '@/theme/theme-context'
import { DeleteIcon } from '@chakra-ui/icons'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Icon } from '@chakra-ui/react'
import { LuArchive, LuMoreVertical } from 'react-icons/lu'
import { TbRefreshAlert } from 'react-icons/tb'
import listContext from './list-context'

export default function ListMovieMenuView (): JSX.Element {
  const list = listContext.useContext()
  const movie = useMovie()
  const theme = useTheme()
  if (!list.authed) {
    return <></>
  }
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
      </MenuList>
    </Menu>
  )
}
