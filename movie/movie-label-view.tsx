'use client'

import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useMovie } from './movie-context'

export default function MovieLabelView (): JSX.Element {
  const movie = useMovie()
  const spanStyle = {
    whiteSpace: 'nowrap'
  }
  return (
    <>
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
