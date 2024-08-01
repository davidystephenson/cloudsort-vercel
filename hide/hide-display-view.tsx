import { useMovie } from '@/movie/movie-context'
import HideIconView from './hide-icon-view'
import { Spinner } from '@chakra-ui/react'

export default function HideDisplayView (): JSX.Element {
  const movie = useMovie()
  if (movie.hide.active || movie.unhide.active) {
    return <Spinner size='xs' marginRight='2px' />
  }
  if (movie.hidden) {
    const view = <HideIconView />
    return view
  }
  return <></>
}
