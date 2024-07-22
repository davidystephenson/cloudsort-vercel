import MenuIconButton from '@/menu/menu-icon-button'
import { Menu, MenuItem, MenuList } from '@chakra-ui/react'
import { ArrowLeftIcon } from '@chakra-ui/icons'
import themeContext from '@/theme/theme-context'
import episodeContext from './episode-context'
import { MouseEvent } from 'react'

export default function EpisodeMenu (): JSX.Element {
  const episode = episodeContext.useContext()
  const theme = themeContext.useContext()
  const color = theme.darkened ? 'pink' : 'red'
  function handleRewind (event: MouseEvent): void {
    episode.rewind()
  }
  return (
    <Menu>
      <MenuIconButton />
      <MenuList>
        <MenuItem
          color={color}
          icon={<ArrowLeftIcon color={color} />}
          onClick={handleRewind}
        >
          Rewind
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
