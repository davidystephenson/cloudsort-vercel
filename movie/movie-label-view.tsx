'use client'

import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useMovie } from './movie-context'
import HideDisplayView from '@/hide/hide-display-view'

export default function MovieLabelView (): JSX.Element {
  const movie = useMovie()
  const spanStyle = {
    whiteSpace: 'nowrap'
  }
  return (
    <>
      <HideDisplayView />
      &thinsp;
      {movie.item.name}
      &thinsp;
      <span style={spanStyle}>
        ({movie.item.year})
        {' '}
        <ExternalLinkIcon mx='2px' />
      </span>
    </>
  )
}
