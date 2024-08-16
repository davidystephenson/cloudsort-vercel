'use client'

import { useMovie } from './movie-context'
import HideDisplayView from '@/hide/hide-display-view'
import LineSpanView from '@/line/line-span-view'
import { ReactNode } from 'react'

export default function MovieLabelView (props: {
  children?: ReactNode
}): JSX.Element {
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
        {props.children}
      </LineSpanView>
    </>
  )
}
