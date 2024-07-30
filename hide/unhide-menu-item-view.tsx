import { useMovie } from '@/movie/movie-context'
import { MenuItem } from '@chakra-ui/react'
import UnhideIconView from './unhide-icon-view'

export default function UnhideMenuItemView (): JSX.Element {
  const movie = useMovie()
  if (!movie.hidden) {
    return <></>
  }
  function handleUnhide (): void {
    void movie.unhide.act()
  }
  const view = (
    <MenuItem
      icon={<UnhideIconView />}
      onClick={handleUnhide}
    >
      Unhide
    </MenuItem>
  )
  return view
}
