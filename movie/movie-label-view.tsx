'use client'

import { useMovie } from './movie-context'
import HideDisplayView from '@/hide/hide-display-view'
import LineSpanView from '@/line/line-span-view'
import { ReactNode } from 'react'

export default function MovieLabelView (props: {
  children?: ReactNode
}): JSX.Element {
  const movie = useMovie()
  if (props.children != null) {
    return (
      <>
        <HideDisplayView />
        &thinsp;
        {movie.item.name}
        &thinsp;
        <LineSpanView>
          ({movie.item.year})
          {props.children}
        </LineSpanView>
      </>
    )
  }
  const words = movie.item.name.split(' ')
  const last = words.pop()
  const joined = words.join(' ')
  return (
    <>
      <HideDisplayView />
      &thinsp;
      {joined}
      &thinsp;
      {/* <LineSpanView> */}
      {last}
      &thinsp;
      ({movie.item.year})
      {/* </LineSpanView> */}
    </>
  )
}
