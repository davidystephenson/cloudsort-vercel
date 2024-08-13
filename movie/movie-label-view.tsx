'use client'

import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useMovie } from './movie-context'
import HideDisplayView from '@/hide/hide-display-view'
import LineSpanView from '@/line/line-span-view'

export default function MovieLabelView (): JSX.Element {
  const movie = useMovie()
  return (
    <>
      <HideDisplayView />
      &thinsp;
      {movie.item.name}
      &thinsp;
      <LineSpanView>
        ({movie.item.year})
        &thinsp;
        <ExternalLinkIcon mx='2px' />
      </LineSpanView>
    </>
  )
}
