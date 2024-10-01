import { Row } from '@/cell/cell-types'
import episodeContext from './episode-context'
import privateListContext from '@/list/private-list-context'
import { MouseEvent, ReactNode } from 'react'
import ThemeLinkableView from '@/theme/theme-linkable-view'
import marionEpisodeItem from './marion-episode-item'
import { MovieProvider } from '@/movie/movie-context'
import MovieLinkView from '@/movie/movie-link-view'

export default function EpisodeCellsLinkView (props: {
  children: ReactNode
  row: Row<'episode'>
}): JSX.Element {
  const episode = episodeContext.useContext()
  const list = privateListContext.useContext()

  const multiple = props.row.cells.episode.choice ?? props.row.cells.episode.import ?? props.row.cells.episode.random
  if (multiple != null) {
    function handleClick (event: MouseEvent): void {
      event.preventDefault()
      list.toggleEpisode({ episodeId: props.row.cells.episode.mergeChoiceId })
    }
    return (
      <ThemeLinkableView href='#' onClick={handleClick} width='100%'>
        {props.children}
      </ThemeLinkableView>
    )
  }
  const item = marionEpisodeItem({
    part: episode.element
  })
  return (
    <MovieProvider item={item}>
      <MovieLinkView linkProps={{ width: '100%' }}>
        {props.children}
      </MovieLinkView>
    </MovieProvider>
  )
}
