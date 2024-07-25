import { useListContext } from '../list/list-context'
import PrivateListMovieMenuView from '../list/private-list-movie-menu-view'
import PublicListMovieMenuView from '../list/public-list-movie-menu-view'

export default function MovieCellsMenuView (): JSX.Element {
  const list = useListContext()
  if (list.private) {
    return <PrivateListMovieMenuView />
  }
  return <PublicListMovieMenuView />
}
