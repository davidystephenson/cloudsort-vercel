import { useListContext } from './list-context'
import PrivateListMovieMenuView from './private-list-movie-menu-view'
import PublicListMovieMenuView from './public-list-movie-menu-view'

export default function MovieCellsMenuView (): JSX.Element {
  const list = useListContext()
  if (list.private) {
    return <PrivateListMovieMenuView />
  }
  return <PublicListMovieMenuView />
}
