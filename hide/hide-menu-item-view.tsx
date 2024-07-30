import { useMovie } from '@/movie/movie-context'
import { MenuItem } from '@chakra-ui/react'
import HideIconView from './hide-icon-view'

export default function HideMenuItemView (): JSX.Element {
  const movie = useMovie()
  if (movie.hidden) {
    return <></>
  }
  function handleHide (): void {
    void movie.hide.act()
  }
  const view = (
    <MenuItem
      icon={<HideIconView />}
      onClick={handleHide}
    >
      Hide
    </MenuItem>
  )
  return view
}
